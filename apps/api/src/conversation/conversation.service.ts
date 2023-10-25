import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model, Types } from 'mongoose'
import { Conversation } from './conversation.schema'
import { ConversationDto } from './conversation.dto'

@Injectable()
export class ConversationService {
    constructor(
        @InjectModel(Conversation.name)
        private readonly conversationModel: Model<Conversation>,
    ) {}

    async createConversation(conversationDto: ConversationDto) {
        const conversation = new this.conversationModel(conversationDto)
        return await conversation.save()
    }

    async getConversationById(id: Types.ObjectId) {
        return await this.conversationModel.findById(id)
    }

    async getConversationsByUserId(userId: string) {
        return await this.conversationModel
            .find({ participants: { $in: [userId] } })
            .sort({ createdAt: -1 })
            .populate('participants', "-password -email -createdAt -updatedAt -isAdmin -__v")


    }

    async getConversationByParticipants(participants: Types.ObjectId[]) {
        return await this.conversationModel
            .findOne({
                participants: { $all: participants },
            })
            .populate('participants')
            .exec()
    }

    async deleteConversationById(id: string) {
        return await this.conversationModel.findByIdAndDelete(id)
    }

    async deleteConversationsByParticipant(participant: Types.ObjectId) {
        return await this.conversationModel.deleteMany({
            participants: participant,
        })
    }

    async createDialog(user1: Types.ObjectId, user2: Types.ObjectId) {
        return await this.createConversation({
            participants: [
                new Types.ObjectId(user1),
                new Types.ObjectId(user2),
            ],
        })
    }

    async getDialog(user1: Types.ObjectId, user2: Types.ObjectId) {
        return await this.getConversationByParticipants([user1, user2])
    }

    async getConversations() {}
}
