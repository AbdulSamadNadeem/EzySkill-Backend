const app = require('./app')
const dotenv = require('dotenv')
dotenv.config({path:'./congig.env'})
const mongoose = require('mongoose')

mongoose.connect(process.env.CONN_STR)
.then((db)=>{
    console.log('db connected successfullu')
})
.catch((err)=>{
    console.log("somethng went wrong ")
})


app.listen(3000 , ()=>{
    console.log("the server is started")
})