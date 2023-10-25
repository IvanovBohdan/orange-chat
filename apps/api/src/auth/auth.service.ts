import { Injectable, UnauthorizedException } from '@nestjs/common'
import { UserService } from 'src/user/user.service'
import { GetUserDto } from 'src/user/dto/get-user.dto'
import { JwtService } from '@nestjs/jwt'
import * as bcrypt from 'bcrypt'
import { User } from 'src/user/user.schema'
import { CreateUserDto } from 'src/user/dto/create-user.dto'

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService,
    ) {}

    async validateToken(token: string): Promise<GetUserDto> {
        if (!token) throw new UnauthorizedException()
        token = token?.split(' ')?.[1] ?? token
        const user = await this.jwtService.verify(token)
        return user
    }

    async validateUser(user: GetUserDto): Promise<User> {
        return await this.userService.getUserById(user._id)
    }

    async login(email: string, pass: string){
        const user = await this.userService.getUserByEmail(email)
        if (user && (await bcrypt.compare(pass, user.password))) {
            const { password, createdAt, updatedAt, ...payload } =
                user.toObject()
            return {token: this.jwtService.sign(payload), user: payload}
        }
        throw new UnauthorizedException()
    }
}
