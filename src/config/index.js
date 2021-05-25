import 'dotenv/config';

module.exports = {
    secret: process.env.NODE_ENV === 'production' ? process.env.SECRET : 'secret'
};