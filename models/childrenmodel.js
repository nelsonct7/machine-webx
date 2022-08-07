const mongoose=require('mongoose');

const childrenSchema=mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    age:{
        type:Number,
        required:true
    },
    mobno:{
        type:String, 
        required: true
        }
})

const ChildrenModel=mongoose.model('ChildrenModel',childrenSchema);

module.exports=ChildrenModel 