const Model = require('../Model/Model')

exports.getAllData = async(req,res)=>{
      try{

        const data = await Model.find().sort('admission_date')
        res.status(200).json({
            status:"success",
            lenght:data.length,
            data:{
                data,
            }
        })

      }catch(e){
           res.status(400).json({
            status:"failed",
            message:e.message
           })
      }
}
exports.getDatabyRoll = async(req,res)=>{
      try{
        const data = await Model.find(req.params.roll)
        res.status(200).json({
            status:"success",
            data:{
                data:data
            }
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
            data:{
                data:data
            }
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
        const data = await Model.findByIdAndUpdate(req.params.roll ,req.body , {new:true , runValidators:true})
        res.status(200).json({
            status:"success",
            data:{
                data:data
            }
        })

      }catch(e){
           res.status(400).json({
            status:"failed",
            message:e.message
           })
      }
}
exports.DeleteData = async(req,res)=>{
      try{
        await Model.findByIdAndDelete(req.params.roll)
        res.status(200).json({
            status:"success",
            data:null
        })

      }catch(e){
           res.status(400).json({
            status:"failed",
            message:e.message
           })
      }
}