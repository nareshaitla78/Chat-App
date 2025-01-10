
const User=require('../model/UserModel');
const bcrypt=require('bcrypt');
const sendEmail = require("../utils/sendEmail");
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

module.exports.resetPassword = async (req, res) => {
    const { email } = req.body;
  
    try {
      const user = await User.findOne({ email });
  
      if (!user) {
        return res.status(400).json({ message: 'User not found.' });
      }
  
      const resetToken = Math.random().toString(36).substring(2, 15);  
      const resetTokenExpiration = Date.now() + 3600000;  
  
      user.resetToken = resetToken;
      user.resetTokenExpiration = resetTokenExpiration;
  
      await user.save();
  
      const resetLink = `${process.env.HOST}/reset-password/${resetToken}`;
  
      const htmlContent = `
            <html>
                <body style="font-family: Arial, sans-serif; background-color: #131324; color: #ffffff;">
                <div style="max-width: 600px; margin: 0 auto; padding: 20px; background-color: #00000076; border-radius: 20px;">
                    <h1 style="color: #007bff; text-align: center; text-transform: uppercase; font-size: 2rem;">Reset Password</h1>
                    <p style="text-align: center; font-size: 1.1rem;">
                    You requested a password reset. Click on the button below within the next 60 minutes to reset your password for your account <strong>${email}</strong>.
                    </p>
                    <div style="text-align: center;">
                    <form action="${resetLink}" method="get">
                        <button type="submit" style="padding: 1rem 2rem; background-color: #997af0; color: white; font-weight: bold; font-size: 1.1rem; border-radius: 5px; text-transform: uppercase; border: none; cursor: pointer;">
                        Reset your password
                        </button>
                    </form>
                    </div>
                    <p style="text-align: center; font-size: 1rem;">
                    If you are having any issues with your account,please send a email to nareshaitla1122@gmail.com.
                    </p>
                    <p style="text-align: center; font-size: 1rem;">
                    If this was a mistake, please ignore this email and nothing will happen.
                    </p>
                </div>
                </body>
            </html>
            `;  
      console.log(`Sending email to ${email} with reset link`);
      await sendEmail(email, 'Password Reset Request', htmlContent);
  
      res.json({ message: 'We have sent instructions on resetting your password to your email address.', status: true });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error processing your request.', status: false });
    }
  };