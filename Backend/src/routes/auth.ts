import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User } from '../models/User';
import { regauth ,logauth ,getUser} from '../controllers/auth.controller';
import { verifyToken } from '../middleware/authMiddleware';


const router = express.Router();

router.post('/register', regauth);

router.post('/login', logauth);

router.get('/getUser',verifyToken, getUser)

export default router;
