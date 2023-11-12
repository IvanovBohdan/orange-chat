import {
    Body,
    Controller,
    Get,
    Param,
    Post,
    UseGuards,
    Request,
    Query,
} from '@nestjs/common'
import { ConversationService } from 'src/conversation/conversation.service'
import { MessageService } from './message.service'
import { MessageDto } from './message.dto'
import { AuthGuard } from '@nestjs/passport'

@UseGuards(AuthGuard('jwt'))
@Controller('messages')
export class MessageController {
    constructor(
        private readonly messageService: MessageService,
        private readonly conversationService: ConversationService,
    ) {}

    @Get(':id')
    async getMessages(
        @Param('id') conversation: string,
        @Query('lastId') lastId: string,
        @Query('limit') limit: number,
    ) {
        const messages = await this.messageService.getMessages(
            conversation,
            lastId,
            limit,
        )

        return messages
    }

    @Post()
    async createMessage(@Request() req: any, @Body() messageDto: MessageDto) {
        const { user } = req
        const message = await this.messageService.sendMessage({
            ...messageDto,
            sender: user?._id,
        })
        return message.toObject()
    }
}
