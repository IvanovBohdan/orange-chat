import { Inject, Injectable, forwardRef } from '@nestjs/common'
import { Server } from 'socket.io'
import { Types } from 'mongoose'
import { ChatGateway } from './chat.gateway'

type ObjectId = Types.ObjectId

@Injectable()
export class ChatService {
    public server: Server = null
    public connectionsMap: Map<string, string>
    constructor(
        @Inject('CONNECTIONS_MAP') connectionsMap: Map<string, string>,
        @Inject(forwardRef(() => ChatGateway))
        private readonly chatGateway: ChatGateway,
    ) {
        this.connectionsMap = connectionsMap
        this.server = this.chatGateway.server
    }

    addConnection(userId: ObjectId | String, socketId: string) {
        return this.connectionsMap.set(String(userId), socketId)
    }

    removeConnection(userId: ObjectId | String) {
        return this.connectionsMap.delete(String(userId))
    }

    getClientById(id: string) {
        return this.chatGateway.server?.sockets?.sockets?.get(id)
    }

    sendToOne(id: ObjectId, event: string, data: any) {
        const clientId = this.connectionsMap.get(String(id))
        const client = this.getClientById(clientId)
        if (!client) return
        client.emit(event, data)
    }

    sendToMany(event: string, ids: ObjectId[], data: any, exclude?: ObjectId) {
        console.log('send to many', ids.map(String), 'exclude', exclude)
        ids.forEach((id) => {
            if (exclude && String(id) === String(exclude)) return
            this.sendToOne(id, event, data)
        })
    }
}
