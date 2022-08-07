const mongoose=require('mongoose');

const parentSchema=mongoose.Schema({
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
        unique:true,
        required: true
        },
    children:{
        type:Array,
        default:[]
    }
})

const ParentModel=mongoose.model('ParentModel',parentSchema);

module.exports=ParentModel 