export const config = {
    jwt_secret: 'your-secret-key',
    jwt_expiration: '30d',
    cors: {
        origin: '*',
        credentials: false,
    },
    mongoURI: process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/orange-chat',
}
