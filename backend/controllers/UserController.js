
const User=require('../model/UserModel');
const bcrypt=require('bcrypt');
module.exports.register= async (req,res,next)=>{
    console.log(req.body);
    try{
        const {username,email,password}=req.body;
    const usernameCheck=await User.findOne({username});
    if(usernameCheck){
        return res.json({message:"Username already exists",status:false});
    }
    const emailCheck=await User.findOne({email});
    if(emailCheck){
        return res.json({message:"Email already exists",status:false});
    }
    const hashedPassword=await bcrypt.hash(password,10);
    const uset=await User.create({
        username,
        email,
        password:hashedPassword
    });
    delete User.password;
    return res.json({message:"User created successfully",status:true});
    }
    catch(err){
        console.log(err);
        return res.json({message:"Internal server error",status:false});
    }
}