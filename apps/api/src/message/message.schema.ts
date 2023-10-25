import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Conversation } from 'src/conversation/conversation.schema';
import { User } from 'src/user/user.schema';

@Schema()
export class Message extends Document {
    @Prop({ required: true })
    content: string;

    @Prop({ required: true, ref: User.name })
    sender: Types.ObjectId;

    @Prop({ required: true, ref: Conversation.name })
    conversation: Types.ObjectId;

    @Prop({ default: Date.now })
    createdAt: Date;
}

export const MessageSchema = SchemaFactory.createForClass(Message);
