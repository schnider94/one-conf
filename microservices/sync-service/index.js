const { createApp } = require('@schnider94/app');

const syncer = require('./src');

createApp()
    .start(syncer);
