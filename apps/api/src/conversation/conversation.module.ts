import { Module } from '@nestjs/common';
import { ConversationService } from './conversation.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Conversation, ConversationSchema } from './conversation.schema';
import { ConversationController } from './conversation.controller';

@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: Conversation.name,
                schema: ConversationSchema,
            },
        ]),
    ],
    providers: [ConversationService],
    exports: [ConversationService],
    controllers: [ConversationController],
})
export class ConversationModule {}
