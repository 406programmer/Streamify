import { upsertStreamUser } from '../lib/stream.js';
import User from '../models/User.js';
import jwt from 'jsonwebtoken';

export async function signup(req, res) {
    const { fullName, email, password } = req.body;
    
   try{ 
    if(!fullName || !email || !password)
     return res.status(400).json({message:"All fields are required"});

    if(password.length<6)
    return res.status(400).json({message:"Password must be at least 6 characters"});

    const emailRegex=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if(!emailRegex.test(email)){
       return  res.status(400).json({message:"Invalid email format"}); 
    }
    const existingUser= await User.findOne({email});
    if(existingUser){
        return res.status(400).json({message:"Email already exists, please provide a different email"});
    }

    const idx = Math.floor(Math.random() * 100)+1
    const randomAvatar = `https://avatar.iran.liara.run/public/${idx}`;

    const newUser = await User.create({
        fullName,
        email,
        password,
        profilePic:randomAvatar
    });
    try {
        await upsertStreamUser({
            id:newUser._id.toString(),
            name:newUser.fullName,
            image:newUser.profilePic,
        }); 
        console.log(`Stream User created/updated for ${newUser.fullName}`);       
    } catch (error) {
        console.error('Error creating Stream User:', error);
    }

    const token = jwt.sign(
        {userId:newUser._id},
        process.env.JWT_SECRET_KEY,
        {expiresIn:'7d'}
    );
    //run openssl rand -base64 32 command to generate secret key for JWT in bash terminal

    
    res.cookie('jwt',token,{
        httpOnly:true,
        secure:process.env.NODE_ENV==='production',
        sameSite:'strict',
        maxAge:7*24*60*60*1000 // 7 days
    });

    res.status(201).json({
        success:true,
        user:newUser,
    })

}catch(error){
    console.error('Error during user signup:',error);
    res.status(500).json({message:"Internal Server Error",error:error.message});

}
}
export async function login(req, res) {
    const { email, password } = req.body;
    try {
        if(!email || !password){
            return res.status(400).json({message : "All fields are required"});
        }
        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({message : "Invalid email or password"});
        }
        const isMatch = await user.comparePassword(password);
        if(!isMatch){
            return res.status(400).json({message : "Invalid email or password"});
        }

        const token = jwt.sign(
          { userId: user._id },
          process.env.JWT_SECRET_KEY,
          { expiresIn: "7d" }
        );
        //run openssl rand -base64 32 command to generate secret key for JWT in bash terminal

        res.cookie("jwt", token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "strict",
          maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        });
        res.status(200).json({
          success: true,
          user,
        });

    } catch (error) {
        console.error('Error during user login:', error);
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
}
export function logout(req, res) {
    res.clearCookie('jwt');
    res.status(200).json({message:"Logout successful"});
}
export async function onBoard(req,res){
    try {
        const userId=req.user._id;
        const {fullName, bio,nativeLanguage,learningLanguage,location}=req.body;
        if(!fullName || !bio || !nativeLanguage || !learningLanguage || !location){
            return res.status(400).json({
                message : "All fields are required",
            missingFields: [
                !fullName && 'fullName',
                !bio && 'bio',
                !nativeLanguage && 'nativeLanguage',
                !learningLanguage && 'learningLanguage',
                !location && 'location',
            ].filter(Boolean)
            });
        }
        const updatedUser = await User.findByIdAndUpdate(userId,
           { ...req.body,
            isOnBoarded:true},{new:true}
        );
        if(!updatedUser){
            return res.status(404).json({message:"User not found"});
        }
        
        try {
             await upsertStreamUser({
                 id:updatedUser._id.toString(),
                 name:updatedUser.fullName,
                 image:updatedUser.profilePic || "",
             });
             console.log(`Stream User updated for ${updatedUser.fullName}`);
        
        } catch (error) {
           console.error('Error updating Stream user during onboarding:', error);    
        }

        res.status(200).json({
            success:true,
            user:updatedUser,
        });

    } catch (error) {
        console.error('Onboarding error:',error);
        res.status(500).json({message:"Internal Server Error",error:error.message});
    }
}

