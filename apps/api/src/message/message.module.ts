import { Module } from '@nestjs/common'
import { MessageController } from './message.controller'
import { MessageService } from './message.service'
import { MongooseModule } from '@nestjs/mongoose'
import { Message, MessageSchema } from './message.schema'
import { ConversationModule } from 'src/conversation/conversation.module'
import { ChatModule } from 'src/chat/chat.module'
import { ChatService } from 'src/chat/chat.service'

@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: Message.name,
                schema: MessageSchema,
            },
        ]),
        ConversationModule,
        ChatModule,
    ],
    controllers: [MessageController],
    providers: [MessageService, ChatService],
    exports: [MessageService],
})
export class MessageModule {}
