import { Injectable, UnauthorizedException } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { Strategy, ExtractJwt } from 'passport-jwt'
// import { JwtPayload } from './jwt-payload.interface';
import { AuthService } from './auth.service'
import { config } from 'src/config'
import { GetUserDto } from 'src/user/dto/get-user.dto'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly authService: AuthService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: config.jwt_secret,
            
        })
    }

    async validate(payload: GetUserDto) {
        const user = await this.authService.validateUser(payload)
        if (!user) {
            throw new UnauthorizedException()
        }
        return user
    }
}
