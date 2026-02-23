const mongoose = require('mongoose')
async function connectTodDatabase() {
    await mongoose.connect(process.env.ConnectionString)
    console.log("Connected to DB successfully")
}
module.exports = connectTodDatabase