import { Controller, Get, Request } from '@nestjs/common'
import { AppService } from './app.service'
import { UseGuards } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'

@Controller()
export class AppController {
    constructor(private readonly appService: AppService) {}

    @Get()
    getHello(): string {
        return this.appService.getHello()
    }

    @Get('protected')
    @UseGuards(AuthGuard('jwt'))
    protectedRoute(@Request() req) {
        return req.user
    }
}
