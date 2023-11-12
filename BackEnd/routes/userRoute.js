import express from 'express'
import { authUser,updateUserProfile,GetUserProfile,logOutUser,registerUser } from '../Controllers/userController.js'

 const router=express.Router()

 router.post('/',registerUser)
 router.post('/auth',authUser)
 router.post('/logout',logOutUser)
 router.route('/profile').get(GetUserProfile).put(updateUserProfile)
 

export default router