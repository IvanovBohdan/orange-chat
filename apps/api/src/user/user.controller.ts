import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
    Query,
} from '@nestjs/common'
import { UserService } from './user.service'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { User } from './user.schema'

@Controller('users')
export class UserController {
    constructor(
        private readonly userService: UserService, // private readonly authService: AuthService,
    ) {}

    @Post()
    async createUser(@Body() createUserDto: CreateUserDto) {
        const user = await this.userService.createUser(createUserDto)
        return user
    }

    @Get()
    async getAllUsers() {
        return await this.userService.getAllUsers()
    }

    @Get('/search')
    async searchUsers(@Query('q') query: string) {
        return await this.userService.search(query)
    }

    @Get(':id')
    async getUserById(@Param('id') id: string) {
        return await this.userService.getUserById(id)
    }

    @Patch(':id')
    async updateUserById(
        @Param('id') id: string,
        @Body() updateUserDto: UpdateUserDto,
    ) {
        return await this.userService.updateUserById(id, updateUserDto)
    }

    @Delete(':id')
    async deleteUserById(@Param('id') id: string) {
        return await this.userService.deleteUserById(id)
    }
}
