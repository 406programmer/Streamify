import express from 'express';
import { signup, login, logout } from '../controllers/auth.controller.js';
import { protectRoute } from '../middleware/auth.middleware.js';
import { onBoard } from '../controllers/auth.controller.js';

const router = express.Router();

router.post('/signup',signup);
router.post('/login',login);
router.post('/logout',logout);

router.post('/onboarding',protectRoute,onBoard);

//checks user is logged in or not
router.get('/me',protectRoute,(req,res)=>{
 res.status(200).json({success:true,user:req.user});
})

//forget password, reset password routes can be added here


export default router;