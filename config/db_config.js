module.exports= {
    HOST: "localhost",
    USER: "root",
    PASSWORD: "1234",
    DB: "mengedegna",
    DIALECT: "mysql",

    pool: {
        MAX: 5,
        MIN: 0,
        acquire: 30000,
        idle: 10000
    }
};