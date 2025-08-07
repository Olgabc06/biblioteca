module.exports = {
    HOST: "ep-calm-rain-ad8hac5u-pooler.c-2.us-east-1.aws.neon.tech",
    USER: "neondb_owner",
    PASSWORD: "npg_L3hDBd7lEuoz",
    DB: "neondb",
    dialect: "postgres",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};