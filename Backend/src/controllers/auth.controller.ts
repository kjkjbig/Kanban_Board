import { User } from '../models/User';
import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';


export const regauth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;
    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ message: 'User already exists' });

    const hash = await bcrypt.hash(password, 10);
    const user = new User({ email, password: hash });
    await user.save();

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET!, { expiresIn: '1d' });

    res.json({ token });
  } catch (e) {
    next(e)
  }
}

export const logauth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET!, { expiresIn: '1d' })

    res.json({ token });
  }catch(e){
    next(e)
  }
}

export const getUser = async (req: Request, res: Response) => {
  console.log('Decoded user ID from token:', req.userId)

  const user = await User.findById(req.userId).select('-password')
  if (!user) return res.status(404).json({ message: 'User not found' })
  res.json(user)
}