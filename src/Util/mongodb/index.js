// Mongoose import
const  mongoose =require( "mongoose");

// Mongoose - DB
const MONGODB_URL = `mongodb://localhost:27017/invoice-db`;
mongoose.connect(MONGODB_URL, () => {
    console.log('[MongoDB]', 'connected to database');
})

module.exports = mongoose;
