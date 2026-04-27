import { User } from "../models/user.model.js";
import jwt from "jsonwebtoken";

const requestOtp = async(req,res)=>{
    const {phone,email} = req.body;
    if(!phone && !email){
        return res.status(400).json({message:"PhoneNumber or email are required"});
    }
    try {
      const query = [];
      if (phone) query.push({ phone });
      if (email) query.push({ email });
      let user = await User.findOne({
        $or: query,
      });
      if (!user) {
        user = await User.create({
          phone: phone || null,
          email: email || null,
        });
      }
      const otp = Math.floor(100000 + Math.random() * 900000).toString();
      user.otp = otp;
      user.otpExpiry = Date.now() + 10 * 60 * 1000;
      await user.save();
      console.log("OTP:", otp); 

      return res.status(200).json({ message: "OTP sent successfully", otp });
    } catch (error) {
      console.error("requestOtp error:", error);
        return res.status(500).json({message:"Internal server error,Please try again "});
    }
}

const verifyOtp = async(req,res)=>{
    const {phone,email,otp} = req.body;
    if(!phone && !email){
        return res.status(400).json({message:"PhoneNumber or email are required"});
    }
    if(!otp){
        return res.status(400).json({message:"OTP is required"});
    }
 try {
    const query = [];
    if (phone) query.push({ phone });
    if (email) query.push({ email });
    const user = await User.findOne({
      $or: query,
    });
    if(!user){
        return res.status(400).json({message:"User not found"});
    }
    if(user.otp!==otp ||user.otpExpiry<Date.now()){
        return res.status(400).json({message:"Invalid or expired OTP"});
    }
    user.isVerified = true;
    user.otp = null;
    user.otpExpiry = null;
    await user.save();
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    return res
      .status(200)
      .json({
        success: true,
        message: "Login successful",
        user: { id: user._id, email: user.email, phone: user.phone },
        token,
      });



    
 } catch (error) {
    return res.status(500).json({message:"Internal server error,Please try again "});
 }
}

const resendOtp = async(req,res)=>{
  const { phone, email } = req.body;
  if (!phone && !email) {
    return res
      .status(400)
      .json({ message: "PhoneNumber or email are required" });
  }
  try {
    const query=[];
    if(phone) query.push({phone});
    if(email) query.push({email});
    const user = await User.findOne({
      $or: query,
    });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
     const otp = Math.floor(100000 + Math.random() * 900000).toString();

     user.otp = otp;
     user.otpExpiry = new Date(Date.now() + 10 * 60 * 1000);
     await user.save();

     console.log("Resent OTP:", otp);
        return res.status(200).json({ message: "OTP resent successfully", otp });
    
  } catch (error) {
    return res.status(500).json({ message: "Internal server error,Please try again " });
    
  }
}

const logout = async(req,res)=>{
    return res.status(200).json({
      success:true,message:"Logout successfull"
    })

};

export { requestOtp, verifyOtp, resendOtp, logout }