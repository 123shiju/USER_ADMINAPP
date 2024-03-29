import asyncHandler from 'express-async-handler'
import generateToken from '../utils/generateToken.js'
import User from '../models/userModel.js'

//set token

const authUser = asyncHandler(async (req,res)=>{

  const {email,password} =req.body;
  const user=await User.findOne({email})
  if(user && !user.isBlocked  && (await user.matchPasswords(password))){
    generateToken(res,user._id)
    res.status(201).json({
      _id:user._id,
      name:user.name,
      email:user.email,
    })
   }else if (user.isBlocked){
    res.cookie('jwt', '', { httpOnly: true, expires: new Date(0) });
    res.status(400)
    throw new Error("you have been blocked")
}
   else{
    res.status(400)
    throw new Error('invalid email or password')
   }
})

//register new user

const registerUser = asyncHandler(async (req,res)=>{
  
const { name ,email,password} = req.body

   const userExists =await User.findOne({email})

   if(userExists){
    res.status(400)
    throw new Error ('user already exists')
   }

   const user=await User.create({
    name,
    email,
    password,

   })


   if(user){
    generateToken(res,user._id)
    res.status(201).json({
      _id:user._id,
      name:user.name,
      email:user.email
    })
   }else{
    res.status(400)
    throw new Error('invalid user data')
   }

})


//logout user
const logOutUser = asyncHandler(async (req,res)=>{
  res.cookie('jwt'," ",{
    httpOnly:true,
    expires:new Date(0),
  })

  res.status(200).json({message:'User logged out'})
  
  
})

//getuserprofile
const GetUserProfile = asyncHandler(async (req,res)=>{


  const user={
    _id:req.user._id,
    name:req.user.name,
    email:req.user.email,
    image:req.user.image

  }

  res.status(200).json(user)
})


//updateuserprofile 
const updateUserProfile = asyncHandler(async (req,res)=>{
  const user=await User.findById(req.user._id);
  if(user){
    user.name=req.body.name || user.name
    user.email=req.body.email || user.email
    if(req.file){
      user.userImage=req.file.filename || user.userImage
    }
    if(req.body.password){
      user.password=req.body.password
    }

  const updateduser= await  user.save()
  res.status(200).json({
    _id:updateduser._id,
    name:updateduser.name,
    email:updateduser.email,
    image: updateduser.userImage,

  })

  
  }else{
    res.status(404)
    throw new Error('User not found')
  }

  res.status(200).json({message:" update user profile "})
})



export {
    authUser,
    registerUser,
    logOutUser,
    GetUserProfile,
    updateUserProfile
}