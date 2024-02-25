import express from 'express'
import { protect } from '../middleware/AuthMiddleware.js'

import { submitform ,getForms,deleteForm }  from '../Controllers/userFormController.js'
const router=express.Router()


router.post('/submit',protect,submitform)
router.get('/getForm',protect,getForms)
router.delete('/deleteField',deleteForm)

export default router