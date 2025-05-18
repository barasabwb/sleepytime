import { AuthRequest } from './auth.middleware';
import { Response, NextFunction } from 'express';

export const requireAdmin = (req: AuthRequest, res: Response, next: NextFunction) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    const role = req.user?.role ?? 'unknown';
    res.status(403).json({ message: `Admin access required. Current role: ${role}` });
  }
};
