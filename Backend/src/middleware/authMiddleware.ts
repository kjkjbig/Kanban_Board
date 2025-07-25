import jwt from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express'

interface CustomRequest extends Request {
  userId?: string
}

export const verifyToken = (req: CustomRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization
  const token = authHeader && authHeader.split(' ')[1]

  if (!token) return res.status(401).json({ message: 'No token provided' })

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { id: string }
    req.userId = decoded.id 
    next()
  } catch (err) {
    return res.status(403).json({ message: 'Invalid token' })
  }
}
