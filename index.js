const app = require('./app')
const dotenv = require('dotenv')
dotenv.config({path:'./config.env'})
const mongoose = require('mongoose')
console.log(typeof(process.env.PORT_NUMBER))
mongoose.connect(process.env.CONN_STR)
.then((db)=>{
    console.log('db connected successfullu')
})
.catch((err)=>{
    console.log(err)
    console.log("somethng went wrong ")
})


app.listen(3000 , ()=>{
    console.log("the server is started")
})