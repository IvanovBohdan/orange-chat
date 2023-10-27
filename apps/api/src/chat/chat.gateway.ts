import {
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer,
    OnGatewayConnection,
    OnGatewayDisconnect,
    OnGatewayInit,
} from '@nestjs/websockets'
import { Socket, Server } from 'socket.io'
import { AuthService } from 'src/auth/auth.service'
import { UseGuards, Request, Logger, forwardRef, Inject } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { Types } from 'mongoose'
import { config } from '../config'
import { ChatService } from './chat.service'

type ObjectId = Types.ObjectId

@WebSocketGateway({
    // namespace: '/api/chat',
    cors: {
        origin: config.cors.origin,
        methods: ['GET', 'POST'],
    },
})
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
    constructor(
        private readonly authService: AuthService,
        @Inject(forwardRef(() => ChatService)) private chatService: ChatService,
    ) {}

    @WebSocketServer()
    server: Server

    logger: Logger = new Logger('ChatGateway')

    @UseGuards(AuthGuard('jwt'))
    async handleConnection(client: Socket) {
        this.logger.log(`Client connected: ${client.id}`)
        try {
            const userDto = await this.authService.validateToken(
                client.handshake.headers?.authorization,
            )
            const user = await this.authService.validateUser(userDto)
            const socketId = client.id
            client.handshake.auth = userDto
            this.logger.log(`User connected: ${client.id}`)
            console.log('user connected', user.username, String(user._id))
            this.chatService.addConnection(user._id, socketId)
        } catch (error) {
            client.disconnect()
        }
    }

    async handleDisconnect(client: Socket) {
        this.logger.log(`Client disconnected: ${client.id}`)
        try {
            const user = await this.authService.validateToken(
                client.handshake.headers?.authorization,
            )
            this.chatService.removeConnection(user._id)
        } catch (error) {
            console.log(error)
            client.disconnect()
        }
    }

    // @SubscribeMessage('message')
    // async handleMessage(client: Socket, payload: MessageDto) {
    //     const senderId = client.handshake.auth._id
    //     const message = await this.messageService.sendMessage({
    //         ...payload,
    //         sender: senderId,
    //     })
    // }
}
