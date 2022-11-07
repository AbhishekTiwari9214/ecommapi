const express=require('express')
const app =express()
const userauth=require('./routes/auth')
const cartRoute=require('./routes/cart')
const orderRoute=require('./routes/order')
const productRoute=require('./routes/product')
const cors = require("cors");
const jsonwebtoken=require("jsonwebtoken")
const userroute = require('./routes/user')

app.use(express.json())

const mongoose= require('mongoose');
mongoose.connect('mongodb+srv://ecomapi:Abhi9214@cluster0.0mbwxs0.mongodb.net/?retryWrites=true&w=majority',()=>{
    console.log('your database has been connected');
}).catch((e)=>{
    res.send('no database has been connected')
})


app.listen(8000,()=>{
    console.log('server has been started at port 9000');
}
)

app.use(cors())
app.use('/user',userroute);
app.use('/auth',userauth)


app.use("/products", productRoute);
app.use("/carts", cartRoute);
app.use("/orders", orderRoute);
// app.use("/api/checkout", stripeRoute);
app.get('/' , (req , res)=>{

   res.send('hello from simple server :)')
 
})



