import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'

// export type CatDocument = HydratedDocument<Cat>;

@Schema()
export class User extends Document {
    @Prop({ required: true })
    name: string

    @Prop({ required: true, unique: true })
    username: string

    @Prop({ required: true, unique: true })
    email: string

    @Prop({ required: true })
    password: string

    @Prop({ default: null })
    avatar: string | null

    @Prop({ default: Date.now })
    createdAt: Date

    @Prop({ default: false })
    isAdmin: boolean

    @Prop({ default: Date.now })
    updatedAt: Date
}

export const UserSchema = SchemaFactory.createForClass(User)
UserSchema.index({ name: 'text', username: 'text' })
