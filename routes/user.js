const router=require('express').Router()
const {verifytoken, verifytokenandauth, verifytokenandadmin}=require('./verifytoken')
const CryptoJS=require('crypto-js')
const user=require('../models/users')
///update user
router.put('/:id',verifytokenandauth,async(req,res)=>{
// 
console.log(req.body.password);
if (req.body.password) {
    req.body.password = CryptoJS.AES.encrypt(
      req.body.password,
      'hello'
    ).toString()
  }
  
try {

    const updatedUser = await user.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        }, 
        { new: true }
      );

      const{password,...others}=updatedUser._doc
      res.status(200).json(others);
    
        
} catch (error) {
    res.status(500).json('user is not updated')
}

})


//delete the user 
router.delete('/:id',verifytokenandauth,async (req,res)=>{
  try {
   await user.findOneAndDelete(req.param.id)
   console.log('the user has been deleted');
   res.status(200).json('user is deleted')
  } catch (error) {
    res.status(504).json('cant delete the user'+error)
  }
});
//get the user

router.get('/find/:id',verifytokenandadmin,async (req,res)=>{
console.log(user._id);
  try {
    console.log(user.find())

  const myuser=await user.findOne({_id:req.params.id})
const {password,...others}=myuser._doc

  res.status(200).json(others)   
} catch (error) {
  res.status(500).json("cannot find the user"+error)
}
}) 
//get all the user
router.get('/',verifytokenandadmin,async(req,res)=>{
  const query=req.query.new

  try {
  const users=  query ? await user.find().sort({_id:-1}).limit(5): await user.find()
    res.status(200).json(users)
  
  } catch (error) {
    res.status(500).json('cant get the users'+error)
  } 
})
 
module.exports = router 