import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { UserModule } from './user/user.module'
import { MongooseModule } from '@nestjs/mongoose'
import { AuthModule } from './auth/auth.module'
import { MessageModule } from './message/message.module'
import { ConversationModule } from './conversation/conversation.module'
import { JwtService } from '@nestjs/jwt'
import { ChatModule } from './chat/chat.module';

@Module({
    imports: [
        UserModule,
        MongooseModule.forRoot('mongodb://127.0.0.1:27017/orange-chat'),
        AuthModule,
        MessageModule,
        ConversationModule,
        ChatModule,
    ],
    controllers: [AppController],
    providers: [AppService, JwtService],
})
export class AppModule {}
