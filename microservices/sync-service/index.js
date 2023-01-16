const { createApp } = require('@schnider94/app');
const database = require('@schnider94/database');

createApp()
    .use(function(next) {
        database.setup({
            host: process.env.DB_HOST,
            username: process.env.DB_USERNAME,
            password: process.env.DB_PASSWORD,
            callback: next,
        });
    })
    .start(
        
    );
