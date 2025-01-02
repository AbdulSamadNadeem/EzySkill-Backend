const mongoose = require('mongoose')
const validator = require('validator')
const { validate } = require('./Model')
const bcrypt = require('bcrypt')

const AuthSchema = new mongoose.Schema({
    username:{
        type:String,
        required:[true , 'This Field Is Required'],
        unique:true,
        trim:true,
        minlength:[3 , 'Name must be atleast 3 characters long']
    },
    email:{
        type:String,
        required:[true , 'This Field Is Required'],
        unique:true,
        lowercase:true,
        validate:{
            validator: (value)=> validator.isEmail(value) ,
            message:"Invalid Email Format"
        }
    },
    password:{
        type:String,
        required:[true , 'This Field Is Required'],
        validate:{
            validator:(value)=>validator.isStrongPassword(value , {
                minLength: 6,
                minLowercase: 1,
                minUppercase: 1,
                minNumbers: 1,
                minSymbols: 0,
            })
        },
        message:"Password Should Be Atleast 8 characters long and includes one uppercase letter, one lowercase letter, and one number"

    },
    resetpasstoken :{
        type:String,
    },
    resetpasstokenexpires:{
        type:Date,
    }
})

AuthSchema.virtual('confirmpassword')
.set(function(value){
    this._confirmpassword = value
})
.get(function(){
    return this._confirmpassword
})

AuthSchema.pre('validate' , async function (next) {
         const user = this
         if(user.isModified('password') && this.password !== this.confirmpassword ){
            return next('Password Not Mathced')
         }
         next()
})

AuthSchema.pre('save' , async function (next) {
    const user = this

     if(!user.isModified('password')){
        return next()
     }
     try{
      user.password  =  await bcrypt.hash(user.password , 10)
      next()
     }
     catch(e){
        next(e)
     }
})
AuthSchema.methods.comparePass = async function(pass, passDB) {
    return await bcrypt.compare(pass,passDB)

}
const AuthModel = mongoose.model('users' , AuthSchema)

module.exports = AuthModel