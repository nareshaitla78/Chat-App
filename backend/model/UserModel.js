const mongoose=require("mongoose");

const userSchema=new mongoose.Schema({
    username:{
        type:"String",
        required:true,
        unique:true,
        min:3,
        max:20
    },
    email:{
        type:"String",
        required:true,
        unique:true,
        max:50
    }
    ,password:{
        type:"String",
        required:true,
        min:6
    },
    isAvatarImageSet:{
        type:"Boolean",
        default:false
    },
    avatarImage:{
        type:"String",
        default:""
    },
    resetToken: {
        type: "String",  
      },
      resetTokenExpiration: {
        type: "Date",  
    },
})

module.exports=mongoose.model("Users",userSchema);