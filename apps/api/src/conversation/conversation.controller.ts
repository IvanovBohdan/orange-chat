import {
    Controller,
    Get,
    Param,
    Post,
    Body,
    Delete,
    Request,
} from '@nestjs/common'
import { ConversationService } from './conversation.service'
import { ConversationDto } from './conversation.dto'
import { UseGuards } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { Types } from 'mongoose'
const { ObjectId } = Types

@UseGuards(AuthGuard('jwt'))
@Controller('conversation')
export class ConversationController {
    constructor(private readonly conversationService: ConversationService) {}

    @Post()
    async createConversation(@Body() conversationDto: ConversationDto) {
        return await this.conversationService.createConversation(
            conversationDto,
        )
    }

    @Post('start-dialog/:id')
    async startNewDialog(@Param('id') id: string, @Request() req: any) {
        const conversation = await this.conversationService.getDialog(
            req.user._id,
            new Types.ObjectId(id),
        )
        if (conversation) {
            return conversation
        }
        const newConversation = await this.conversationService.createDialog(
            req.user._id,
            new ObjectId(id),
        )
        return newConversation
    }

    @Get('my')
    async getConversationsByUserId(@Request() req: any) {
        return await this.conversationService.getConversationsByUserId(
            req.user._id,
        )
    }

    @Get(':id')
    async getConversation(@Param('id') id: string) {
        return await this.conversationService.getConversationById(
            new Types.ObjectId(id),
        )
    }

    @Delete(':id')
    async deleteConversation(@Param('id') id: string) {
        return await this.conversationService.deleteConversationById(id)
    }
}
