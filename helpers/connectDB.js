const mongoose= require ('mongoose')

const connectDB = () => {
    mongoose.connect(process.env.URL_MONGO, (err)=>
err ? console.log (err): console.log (`connected to database!`)
);
 }

 module.exports = connectDB;