import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { UserModule } from './user/user.module'
import { MongooseModule } from '@nestjs/mongoose'
import { AuthModule } from './auth/auth.module'
import { MessageModule } from './message/message.module'
import { ConversationModule } from './conversation/conversation.module'
import { JwtService } from '@nestjs/jwt'
import { ChatModule } from './chat/chat.module'
import { config } from './config'
import { ServeStaticModule } from '@nestjs/serve-static'
import { join } from 'path'
@Module({
    imports: [
        ServeStaticModule.forRoot({
            rootPath: join(__dirname, '../..', 'web-client', 'dist'),
        }),
        UserModule,
        MongooseModule.forRoot(config.mongoURI),
        AuthModule,
        MessageModule,
        ConversationModule,
        ChatModule,
    ],
    controllers: [AppController],
    providers: [AppService, JwtService],
})
export class AppModule {}
