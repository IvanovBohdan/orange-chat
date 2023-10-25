import { MinLength, MaxLength, isDefined } from 'class-validator'
import { ObjectId, Types } from 'mongoose'

export class MessageDto {
    _id?: ObjectId

    @MinLength(1)
    @MaxLength(1000)
    content: string

    sender?: Types.ObjectId

    conversation: Types.ObjectId

    createdAt?: Date
}
