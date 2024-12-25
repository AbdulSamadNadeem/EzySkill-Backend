const Model = require('../Model/Model')

exports.getAllData = async(req,res)=>{
      try{

        const data = await Model.find().sort('admission_date')
        res.status(200).json({
            status:"success",
            lenght:data.length,
            data:data
        })

      }catch(e){
           res.status(400).json({
            status:"failed",
            message:e.message
           })
      }
}
exports.getDatabyRoll = async(req,res)=>{
  console.log(req.params.rollnumber)
      try{
        const data = await Model.find({ rollnumber: req.params.rollnumber })
        res.status(200).json({
            status:"success",
            data:data
        })

      }catch(e){
           res.status(400).json({
            status:"failed",
            message:e.message
           })
      }
}
exports.CreateData = async(req,res)=>{
      try{
        const data = await Model.create(req.body)
        res.status(201).json({
            status:"success",
            data:data
        })

      }catch(e){
           res.status(400).json({
            status:"failed",
            message:e.message
           })
      }
}
exports.updateData = async(req,res)=>{
      try{
        const data = await Model.updateOne({rollnumber:req.params.rollnumber},req.body , {new:true , runValidators:true})
        if(data.modifiedCount > 0 ){
          const updatedData = await Model.findOne({rollnumber:req.params.rollnumber})
          res.status(200).json({
              status:"success",
              data:updatedData
          })
        }
        else{
          res.status(404).json({
            status:"failed",
            message:"No changes made or student not found"
           })
        }
      }catch(e){
           res.status(400).json({
            status:"failed",
            message:e.message
           })
      }
}
exports.DeleteData = async(req,res)=>{
      try{
        const Data = await Model.deleteOne({rollnumber:req.params.rollnumber})
        if(Data.deletedCount > 0 ){
          const updatedData = await Model.find()
          res.status(200).json({
              status:"success",
              data:updatedData
          })
        }
        else{
          res.status(404).json({
            status:"failed",
            message:"No changes made or student not found"
           })
        }

      }catch(e){
           res.status(400).json({
            status:"failed",
            message:e.message
           })
      }
}