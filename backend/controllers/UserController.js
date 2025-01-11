
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
    const { email,otp } = req.body;
  
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
    //   const host=process.env.HOST || "http://localhost:3000";
    //   const resetLink = `${host}/reset-password/${resetToken}`;
    //   console.log(process.env.HOST,resetLink,"hosttttttttttttttttttttt",process.env.EMAIL_USER,process.env.SENDGRID_API_KEY);
      
      const htmlContent = `
           <html>
            <body style="font-family: Arial, sans-serif; background-color: #131324; color: #ffffff;">
                <div style="max-width: 600px; margin: 0 auto; padding: 20px; background-color: #00000076; border-radius: 20px;">
                <h1 style="color: #007bff; text-align: center; text-transform: uppercase; font-size: 2rem;">OTP Verification</h1>
                <p style="text-align: center; font-size: 1.1rem;">
                    Use the 6-digit OTP below to Reset Your Password. Please enter this OTP within the next 10 minutes.
                </p>
                <div style="text-align: center; font-size: 1.5rem; font-weight: bold; margin: 20px 0;">
                    ${otp}
                </div>
                <p style="text-align: center; font-size: 1rem;">
                    If you did not request this OTP, please ignore this email. Your account is secure.
                </p>
                <p style="text-align: center; font-size: 1rem;">
                    For any assistance, contact us at <a href="mailto:nareshaitla1122@gmail.com" style="color: #4e0eff;">nareshaitla1122@gmail.com</a>.
                </p>
                </div>
            </body>
            </html>

            `;  
      console.log(`Sending email to ${email} with reset link`);
      await sendEmail(email, 'Password Reset Request', htmlContent);
  
      res.json({ message: 'We have sent instructions on resetting your password to your email address.', status: true });
    } catch (error) {
      console.error(error,process.env.HOST);
      res.status(500).json({ message: 'Error processing your request.', status: false });
    }
  };