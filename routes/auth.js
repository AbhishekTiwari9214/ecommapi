const router= require('express').Router()
// const app= express()
const mongoose=require('mongoose')
const user=require('../models/users')
const bcrypt= require('bcrypt')
const CryptoJS=require('crypto-js')
const jwt=require('jsonwebtoken')



router.post('/register',async(req,res)=>{
console.log('registeration has been started');
    const newuser=new user({
     fullname:req.body.fullname,
     username:req.body.username,
     email:req.body.email,
     password: await CryptoJS.AES.encrypt(req.body.password, 'hello').toString(),


    })
try {
    const myuser=await newuser.save()
    const {password,...others}=myuser._doc
    res.send(others) 

} catch (error) {
    res.send(error)
}




  
}) 





//login 

router.post('/login', async (req, res) => {
    console.log('login has started')
      try{
          const loginuser = await user.findOne(
              {
                  username: req.body.username
              }
          );
  
          !loginuser && res.status(401).json("Wrong User Name");
  
          const hashedPassword = CryptoJS.AES.decrypt(
              loginuser.password,
              'hello'
          );
  
  
          const originalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);
  
          const inputPassword = req.body.password;
          
          originalPassword != inputPassword && 
              res.status(401).json("Wrong Password");
        //   res.send(loginuser) 
  console.log(user);
          const accessToken = jwt.sign(
          {
              id: loginuser._id,
              isAdmin: loginuser.isAdmin, 
          },
         'hello',
              {expiresIn:"3d"}
          );
    
          const{password,...others}=loginuser._doc
// console.log(accessToken);
          res.status(200).json({...others,accessToken});
  
      }catch(err){
          res.status(500).json(err);
      }
             
          })



module.exports=router