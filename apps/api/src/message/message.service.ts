import { BadRequestException, Injectable } from '@nestjs/common'
import { MessageDto } from './message.dto'
import { Message } from './message.schema'
import { InjectModel } from '@nestjs/mongoose'
import { Model, Types } from 'mongoose'
import { ConversationService } from 'src/conversation/conversation.service'
import { ChatService } from 'src/chat/chat.service'

@Injectable()
export class MessageService {
    constructor(
        @InjectModel(Message.name)
        private readonly messageModel: Model<Message>,
        private readonly conversationService: ConversationService,
        private readonly chatService: ChatService,
    ) {}

    async createMessage(messageDto: MessageDto) {
        if (!messageDto.conversation) {
            throw new BadRequestException('Conversation is required')
        }

        const conversation = await this.conversationService.getConversationById(
            messageDto.conversation,
        )

        if (!conversation) {
            throw new BadRequestException('Conversation not found')
        }

        const message = new this.messageModel(messageDto)
        message.conversation = conversation._id
        return await message.save()
    }

    async getMessageById(id: string) {
        return await this.messageModel.findById(id)
    }

    async getMessagesByConversationId(
        conversationId: string,
        limit: number = 20,
    ) {
        return await this.messageModel
            .find({ conversation: new Types.ObjectId(conversationId) })
            .sort({ createdAt: -1 })
            .limit(limit)
    }

    async getMessages(
        conversationId: string,
        lastId: Types.ObjectId | string,
        limit: number = 20,
    ): Promise<Message[]> {
        if (!lastId)
            return this.getMessagesByConversationId(conversationId, limit)
        return this.messageModel
            .find({
                _id: { $lt: lastId },
                conversation: new Types.ObjectId(conversationId),
            })
            .sort({ createdAt: -1 })
            .limit(limit)
            .exec()
    }

    async sendMessage(messageDto: MessageDto) {
        const message = await this.createMessage(messageDto)
        const conversation = await this.conversationService.getConversationById(
            messageDto.conversation,
        )
        this.chatService.sendToMany(
            'message',
            conversation.participants,
            message.toObject(),
            messageDto.sender,
        )
        return message
    }
}
