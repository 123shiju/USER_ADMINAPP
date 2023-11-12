import asyncHandler from 'express-async-handler'

import User from '../models/userModel.js'

//set token

const authUser = asyncHandler(async (req,res)=>{

  res.status(200).json({message:"Auth user"})
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
    password
   })


   if(user){
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

  res.status(200).json({message:"logOut user"})
})

//getuserprofile
const GetUserProfile = asyncHandler(async (req,res)=>{

  res.status(200).json({message:'user profile'})
})


//updateuserprofile 
const updateUserProfile = asyncHandler(async (req,res)=>{

  res.status(200).json({message:" update user profile "})
})



export {
    authUser,
    registerUser,
    logOutUser,
    GetUserProfile,
    updateUserProfile
}