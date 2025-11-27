import express from 'express'
import { register,login } from '../Controllers/user.js';

const router = express.Router();
// User register of route 
// @ Api Name : -user register
// @Api method :- post
// @Api endPoint:-/api/user/register
router.post('/register', register)
// User register of route 
// @ Api Name : -user register
// @Api method :- post
// @Api endPoint:-/api/user/Login
router.post('/login',login)
export default router;