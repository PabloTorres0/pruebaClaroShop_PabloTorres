const mongoose = require('mongoose')

const dbConnect = () => {
    const DB_URI =  process.env.DB_URI
    try {
        mongoose.set("strictQuery", false);
        mongoose.connect(DB_URI);
        console.log("Connected to Mongo Successfully!");
      } catch (error) {
        console.log(error);
      }
}

module.exports = dbConnect