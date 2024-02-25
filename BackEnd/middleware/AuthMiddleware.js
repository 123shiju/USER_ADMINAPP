import jwt from 'jsonwebtoken'
import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js'


const protect=asyncHandler(async(req,res,next)=>{


    let token ;
    token =req.cookies.jwt
    console.log("token",token)

    if(token){
        try {
            const decoded=jwt.verify(token,process.env.JWT_SECRET)
            console.log("decode",decoded)


            req.user=await User.findById(decoded.userId).select('-password')
            console.log("userid",req.user)
            next()


        } catch (error) {
            res.cookie('jwt', '', { httpOnly: true, expires: new Date(0) });
            res.status(401)
            throw new Error('Not authorized, invalid token')
        }
    }else{
        res.cookie('jwt', '', { httpOnly: true, expires: new Date(0) });
        res.status(401)
        throw new Error('Not authorized, no token')
    }
})


export { protect }