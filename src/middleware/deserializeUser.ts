import { NextFunction, Request, Response } from 'express';
import AppError from '../helpers/appError';
import { verifyJwt } from '../helpers/jwt';
import redisClient from '../helpers/connectRedis';
import { findUserById } from '../services/userService';

export const deserializeUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        let access_token;

        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            access_token = req.headers.authorization.split(' ')[1];
        } else if (req.cookies?.access_token) {
            access_token = req.cookies?.access_token;
        }

        if (!access_token) {
            return next(new AppError(401, 'You are not logged in'));
        }

        // Validate the access token
        const decoded = verifyJwt<{ user_profile: { id: number } }>(access_token, 'TOKEN_KEY');

        if (!decoded) {
            return next(new AppError(401, `Invalid token or user doesn't exist`));
        }

        // Check if the user has a valid session
        // const session = await redisClient.get(decoded.sub);

        // if (!session) {
        //     return next(new AppError(401, `Invalid token or session has expired`));
        // }

        // Check if the user still exist
        const user = await findUserById(decoded?.user_profile?.id);

        if (!user) {
            return next(new AppError(401, `Invalid token or session has expired`));
        }

        // Add user to res.locals
        res.locals.user = user;

        next();
    } catch (err: any) {
        next(err);
    }
};
