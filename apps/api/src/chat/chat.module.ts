import { Module, Global } from '@nestjs/common'
import { ChatService } from './chat.service'
import { connectionsMap } from './chat.store'
import { ChatGateway } from './chat.gateway'
import { AuthModule } from 'src/auth/auth.module'

@Global()
@Module({
    imports: [
        AuthModule
    ],
    controllers: [],
    providers: [
        ChatService,
        ChatGateway,
        {
            provide: 'CONNECTIONS_MAP',
            useValue: connectionsMap,
        },
    ],
    exports: [ChatService, 'CONNECTIONS_MAP', ChatGateway],
})
export class ChatModule {}
