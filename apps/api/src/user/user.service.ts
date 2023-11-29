import {
    BadRequestException,
    Injectable,
    InternalServerErrorException,
    NotFoundException,
} from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { User } from './user.schema'
import * as bcrypt from 'bcrypt'
import { JaroWinklerDistance } from 'natural'

@Injectable()
export class UserService {
    constructor(
        @InjectModel(User.name) private readonly userModel: Model<User>,
    ) {}

    async createUser(createUserDto: CreateUserDto): Promise<User> {
        try {
            const user = new this.userModel(createUserDto)
            user.password = await bcrypt.hash(user.password, 7)
            user.isAdmin = false
            return await user.save()
        } catch (err) {
            // throw new BadRequestException();
            console.log(err)
        }
    }

    async getAllUsers(): Promise<User[]> {
        return await this.userModel.find()
    }

    async getUserById(id: string): Promise<User> {
        const user = await this.userModel.findById(id)
        if (!user) {
            throw new NotFoundException('User not found')
        }
        return user
    }

    async getUserByEmail(email: string): Promise<User> {
        const user = await this.userModel.findOne({ email })
        if (!user) {
            throw new NotFoundException('User not found')
        }
        return user
    }

    async updateUserById(
        id: string,
        updateUserDto: UpdateUserDto,
    ): Promise<User> {
        const user = await this.userModel.findByIdAndUpdate(id, updateUserDto, {
            new: true,
        })
        if (!user) {
            throw new NotFoundException('User not found')
        }
        return user
    }

    async deleteUserById(id: string): Promise<User> {
        const user = await this.userModel.findByIdAndDelete(id)
        if (!user) {
            throw new NotFoundException('User not found')
        }
        return user
    }

    async searchByUsername(username: string): Promise<User[]> {
        const users = await this.userModel
            .find({
                username: { $regex: username, $options: 'i' },
            })
            .sort({ username: 1 })
        if (!users) {
            throw new NotFoundException('User not found')
        }
        return users.sort((a, b) => {
            const aScore = a.username.toLowerCase().indexOf(username)
            const bScore = b.username.toLowerCase().indexOf(username)
            return bScore - aScore
        })
    }

    async search(query: string): Promise<User[]> {
        if (!query) {
            throw new BadRequestException('Invalid query')
        }

        if (query[0] === '@') {
            return await this.searchByUsername(query.slice(1))
        }

        const users = await this.userModel.find({
            $or: [
                { username: { $regex: query, $options: 'i' } },
                { name: { $regex: query, $options: 'i' } },
            ],
        })

        if (!users) {
            throw new NotFoundException('User not found')
        }
        return users.sort((a, b) => {
            const aScore = Math.min(
                a.username.toLowerCase().indexOf(query),
                a.name.toLowerCase().indexOf(query),
            )
            const bScore = Math.min(
                b.username.toLowerCase().indexOf(query),
                b.name.toLowerCase().indexOf(query),
            )
            return bScore - aScore
        })
    }
}
