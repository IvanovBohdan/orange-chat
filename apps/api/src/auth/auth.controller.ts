import { Controller, Body, Post, Request } from '@nestjs/common';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UserService } from 'src/user/user.service';
import { AuthService } from './auth.service';
import { GetUserDto } from 'src/user/dto/get-user.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    console.log(createUserDto);
    const user = this.userService.createUser(createUserDto);
    return user;
  }

  @Post('login')
  async login(@Request() req){
    return await this.authService.login(req.body.email, req.body.password)
  }
}
