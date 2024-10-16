import { NextFunction, Request, Response } from 'express';
import { AppDataSource } from '../db';
import { User } from '../models/user';

export async function getUsers(req: Request, res: Response) {
    const users: User[] = await AppDataSource.getRepository(User).find();
    res.json(users);
}

export async function getHome(req: Request, res: Response) {
    res.send('Express on Vercel s');
}

export async function getMe(req: Request, res: Response) {
    const users: User[] = await AppDataSource.getRepository(User).find();
    res.json(users);
}

export const getMeHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = res.locals.user;
        res.status(200)
            .status(200)
            .json({
                status: 'success',
                data: {
                    ...user,
                },
            });
    } catch (err: any) {
        next(err);
    }
};
