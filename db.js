const mongoose = require('mongoose');

//define the mongoDB connection URL
const mongoURL = 'mongodb://localhost:27017/hotels'

// set up mongoDB connection
mongoose.connect(mongoURL,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

// get the default connection
// mongoose maintains a default connection object representing the mongoDB connection 

const db  = mongoose.connection;

// define teh listner for database 
db.on('connected',() => {
    console.log('connected to MongoDB server')
});

db.on('error',(err) => {
    console.error(' MongoDB connection error:', err)
});

db.on('disconnected',() => {
    console.log(' MongoDB disconnected')
});


// export the dataBase connection 
module.exports = db;