import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document, Types, Schema as MongooseSchema, set } from 'mongoose'
import { User } from 'src/user/user.schema'

@Schema()
export class Conversation extends Document {
    @Prop({ required: false })
    name: string

    @Prop({ required: false, ref: User.name })
    owner: Types.ObjectId

    @Prop({ required: true, default: false })
    isGroup: boolean

    @Prop({
        type: [{ type: MongooseSchema.Types.ObjectId, ref: User.name }],
        required: true,
        ref: User.name,
    })
    participants: Types.ObjectId[]
}

export const ConversationSchema = SchemaFactory.createForClass(Conversation)
