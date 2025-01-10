
const User=require('../model/UserModel');
const bcrypt=require('bcrypt');
// const sendEmail = require("../SendEmail");
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
    // await sendEmail(email,username);
    const hashedPassword=await bcrypt.hash(password,10);
    const uset=await User.create({
        username,
        email,
        password:hashedPassword
    });
    delete User.password;
    return  res.status(200).json({
        status: true,
        message: "Registration successful! Welcome email sent.",
        username,
    });
    }
    catch(err){
        console.log(err);
        return res.json({message:"Internal server error",status:false});
    }
}

module.exports.login= async (req,res,next)=>{
    try{
        const {username,password}=req.body;
        const user=await User.findOne({username});
        
        if(!user){
            return res.json({message:"Invalid username or password",status:false});
        } 
        const isPasswordValid=await bcrypt.compare(password,user.password);
        if(!isPasswordValid){
            return res.json({message:"Invalid username or password",status:false});
        }
        delete user.password;;
        return res.json({status:true,message:"Login successful",user});  
    }
    catch(err){
        next(err);
    }
}