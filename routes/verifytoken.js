const jwt=require("jsonwebtoken")



const verifytoken=(req,res,next)=>{
const authheader=req.headers['token']
// console.log(authheader);
if (authheader){
    const token=authheader.split(' ')[1]
    // console.log(token);
    jwt.verify(token,'hello',(err,payload)=>{ 
        if(err){
            res.json('not a valid token')
        }else{
            req.payload=payload
            next()
        }
    })
    


}else{
    res.status(403).json('you are not authenticated')
}
}


const verifytokenandauth=(req,res,next)=>{ 
    verifytoken(req,res,()=>{
console.log(req.payload);
        // console.log(req.payload.iat,req.params.id,req);
        if(req.payload.id==req.params.id||req.payload.isAdmin){
            next()
        }else{
            res.status(403).json('you are not alowed to do that')
        }
    })
}
const verifytokenandadmin=(req,res,next)=>{ 
    verifytoken(req,res,()=>{
console.log(req.payload);

        // console.log(req.payload.iat,req.params.id,req);
        if(req.payload.isAdmin){
            next()
        }else{
            res.status(403).json('you are not alowed to do that')
        }
    })
}
 
module.exports={verifytoken,verifytokenandauth,verifytokenandadmin}