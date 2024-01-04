
export const EnvConfiguration = ()=>({
    enviromment: process.env.NODE_ENV || 'dev',
    mongodb: process.env.MONGODB,
    port: process.env.PORT || 3001,
    default_limint: +process.env.DEFAULT_LIMIT || 7,
})