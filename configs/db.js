const mongoose = require('mongoose');

async function connect() {
    try {
        await mongoose.connect(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@mypham.vwdee.mongodb.net/${process.env.DATABASE_NAME}?retryWrites=true&w=majority`);
        console.log('Connect successfully');
    } catch (err) {
        console.log('Connect failed!!!');
        console.log(err);
    }
}

module.exports = { connect };