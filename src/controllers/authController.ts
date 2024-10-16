import { CookieOptions, NextFunction, Request, Response } from 'express';
import { AppDataSource } from '../db';
import { User } from '../models/user';
import AppError from '../helpers/appError';
import { findUserByEmail, signTokens } from '../services/userService';
import { LoginUserInput } from '../schemas/user.schema';

const cookiesOptions: CookieOptions = {
    httpOnly: true,
    sameSite: 'lax',
};

const accessTokenCookieOptions: CookieOptions = {
    ...cookiesOptions,
    expires: new Date(Date.now() + Number(process.env.accessTokenExpiresIn) * 60 * 1000),
    maxAge: Number(process.env.accessTokenExpiresIn) * 60 * 1000,
};

const refreshTokenCookieOptions: CookieOptions = {
    ...cookiesOptions,
    expires: new Date(Date.now() + Number(process.env.refreshTokenExpiresIn) * 60 * 1000),
    maxAge: Number(process.env.refreshTokenExpiresIn) * 60 * 1000,
};

export const getMe = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = res.locals.user;
        res.status(200).status(200).json({
            status: 'success',
            data: {
                user,
            },
        });
    } catch (err: any) {
        next(err);
    }
};

export async function registerHandler(req: Request, res: Response) {
    const hashPassword = await User.hashPassword(req.body.password);
    const user: User = await AppDataSource.getRepository(User).save({ ...req.body, password: hashPassword });
    res.json(user);
}

export const loginHandler = async (req: Request<{}, {}, LoginUserInput>, res: Response, next: NextFunction) => {
    try {
        const { email, password } = req.body;
        const user = await findUserByEmail({ email });

        // 1. Check if user exist
        if (!user) {
            return next(new AppError(400, 'Invalid email or password'));
        }

        // 2.Check if user is verified
        if (!user.verified) {
            return next(new AppError(401, 'You are not verified, check your email to verify your account'));
        }

        //3. Check if password is valid
        if (!(await User.comparePasswords(password, user.password))) {
            return next(new AppError(400, 'Invalid email or password'));
        }

        // 4. Sign Access and Refresh Tokens
        const { access_token, refresh_token } = await signTokens(user);

        // // 5. Add Cookies
        res.cookie('access_token', access_token, accessTokenCookieOptions);
        res.cookie('refresh_token', refresh_token, refreshTokenCookieOptions);
        res.cookie('logged_in', true, {
            ...accessTokenCookieOptions,
            httpOnly: false,
        });

        // 6. Send response
        res.status(200).json({
            status: 'success',
            access_token,
        });
    } catch (err: any) {
        next(err);
    }
};

const logout = (res: Response) => {
    res.cookie('access_token', '', { maxAge: 1 });
    res.cookie('refresh_token', '', { maxAge: 1 });
    res.cookie('logged_in', '', { maxAge: 1 });
};

export const logoutHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = res.locals.user;

        //   await redisClient.del(user.id);
        logout(res);

        res.status(200).json({
            status: 'success',
        });
    } catch (err: any) {
        next(err);
    }
};
