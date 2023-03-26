import { Request, Response } from 'express';
import { Session, SessionData } from 'express-session';
import { User } from '../db/entities/User';

export interface IContext {
  req: Request & {
    session: Session & Partial<SessionData> & { userId: number };
  };
  res: Response;
  user: User;
}
