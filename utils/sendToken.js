exports.sendToken=(user,statusCode,res)=>{
const token=user.getjwttoken()
const options={
    exipres:new Date(
        Date.now()+process.env.COOKIE_EXPIRE*24*60*60*1000
    ),
    httpOnly:true,
    // secure:true
}
res.status(statusCode).cookie("token",token,options).json({success:true,id:user._id,token})

}