import asynchandler from 'express-async-handler'
import Form from '../models/FormModel.js'




const submitform=asynchandler(async(req,res)=>{
    try {
        const { title , fields }=req.body
    
        const userId=req.user._id

        if(!title || !fields || fields.length===0){
            return res.status(400).json({message:'title and fields are required'})
        }
        const newForm=new Form({userId,title,fields})
        await newForm.save()
        res.status(201).json(newForm)
    } catch (error) {
        console.error(error);
        res.status(500).json({message:'Internal Server Error'})
    }
})

const getForms = async (req, res) => {
    try {
      const { userId } = req.params;
      console.log("userid from backend",userId)
      const forms = await Form.find();
      res.status(200).json({ success: true, forms });
    } catch (error) {
      console.error('Error fetching forms:', error);
      res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
  };



const deleteForm=async(req,res)=>{
  
}
  
  


export {
    submitform,
    getForms,
    deleteForm
}