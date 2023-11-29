import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import mongoose from 'mongoose'
import { config } from './config'

// mongoose.set('debug', true)

async function bootstrap() {
    const app = await NestFactory.create(AppModule)
    app.setGlobalPrefix('api')
    app.enableCors({
        origin: '*',
    })
    await app.listen(config.port || 3000)
}
bootstrap()
