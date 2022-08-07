const ParentModel=require('../models/parentmodel')
const ChildrenModel=require('../models/childrenmodel')
const mongoose=require('mongoose')

const createFile=async(req,res)=>{
    const {name,age,mobno}=req.body.parent
    const child=req.body.child
    try{
        const parentPresent=await ParentModel.findOne({mobno})
        if(parentPresent){
            res.status(400).json({message:"Parent already exist"})
        }else{
            const parent=await ParentModel.create({
                name,
                age,
                mobno
            })
            if(parent){
                child.map(async(chil)=>{
                    await ChildrenModel.create({...chil}).then(async (data)=>{
                        await ParentModel.updateOne({_id:parent._id},{$push:{children:data._id}})
                    })
                })
                res.status(200).json({message:"Success Full",parentId:parent._id})
                
            }else{
                res.status(500).json({message:"Mongoose Error"}) 
            }
        }
    }catch(err){
        res.status(500).json({message:"Server Error"})
    }
}

const readFile=async(req,res)=>{
    const parentId=mongoose.Types.ObjectId(req.params.id);
    try{
        const data=await ParentModel.aggregate([
            { $match: { _id: parentId}},
            // { $unwind : "$children" },
            {
                $lookup:
                  {
                    from: 'childrenmodels',
                    localField:'children' ,
                    foreignField: '_id',
                    as: 'Children'
                  }
             }
        ])
        console.log(data);
        res.status(200).json(data)
    }catch(err){
        console.log(err);
        res.status(500).json({message:"Server Error"})
    }
    
}

module.exports={
    createFile,
    readFile
}