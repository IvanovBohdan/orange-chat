export const config = {
    jwt_secret: process.env.JWT_SECRET ?? 'your-secret-key',
    jwt_expiration: '30d',
    cors: {
        origin: '*',
        credentials: false,
    },
    mongoURI: process.env.MONGO_URI ?? 'mongodb://127.0.0.1:27017/orange-chat',
    port: process.env.PORT ?? 3000,
}
