'use strict';


//env object that applies the environment vars (this is used throughout to reference env so we can have defaults and such.
let env = {
    PORT: process.env.PORT || 3000,

    /*  DATABASE_URL: process.env.DATABASE_URL || '',
     DATABASE_NAME: process.env.DATABASE_NAME || 'hma_dev_1',
     DATABASE_HOST: process.env.DATABASE_HOST || 'hyunda-dev-db.chsexvgnmqbg.us-west-2.rds.amazonaws.com',
     DATABASE_USERNAME: process.env.DATABASE_USERNAME || 'hma_dev_admin',
     DATABASE_PASSWORD: process.env.DATABASE_PASSWORD || 'unknownincludesisterangry',
     DATABASE_PORT: process.env.DATABASE_PORT || 3306,*/

    AUTH_SERVICE_URL: process.env.AUTH_SERVICE_URL,

    REDIS_HOST: process.env.REDIS_HOST || 'localhost',
    REDIS_PASSWORD: process.env.REDIS_PASSWORD || '',
    REDIS_PORT: process.env.REDIS_PORT || 6370,

    FB_APP_ID: process.env.FB_APP_ID,

    NODE_ENV: process.env.NODE_ENV || 'development',
    MONGO_PATH: process.env.MONGO_PATH || 'mongodb://localhost:27017/hyundai',

};


module.exports = env;
