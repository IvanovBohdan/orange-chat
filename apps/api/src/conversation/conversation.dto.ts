import { Types } from 'mongoose';

export class ConversationDto {
    name?: string;
    participants: Types.ObjectId[];
    createdAt?: Date;
}
