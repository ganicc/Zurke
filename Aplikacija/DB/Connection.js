
const mongoose=require('mongoose');

const URI="mongodb+srv://Ganic:marsteam@marsteam-pq2rx.mongodb.net/test?retryWrites=true&w=majority";

const connectDB= async()=>{
    await mongoose.connect(URI,{
        useNewUrlParser: true,
        useUnifiedTopology: true  });
    
    console.log("Database connected.");

}

module.exports=connectDB;

