const mongoose =require('mongoose')
let readData=require('readline-sync')
require('dotenv').config()

const connectDb=async(URL)=>{
    try{
        const conn=await mongoose.connect(URL,{
            useUnifiedTopology: true,
            useNewUrlParser: true,
        })
        console.log('DB Connected Successfully to : '+URL);
    }catch(err){
        console.log('DB Error.... : '+err);
    }
}
 
module.exports =connectDb 