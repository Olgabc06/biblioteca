module.exports = {
    HOST: "ep-billowing-waterfall-aex9245v-pooler.c-2.us-east-2.aws.neon.tech",
    USER: "neondb_owner",
    PASSWORD: "npg_HWB7OGfTgV9i",
    DB: "neondb",
    dialect: "postgres",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};