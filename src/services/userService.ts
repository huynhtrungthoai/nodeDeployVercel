import { AppDataSource } from '../db';
import { signJwt } from '../helpers/jwt';
import { User } from '../models/user';
import redisClient from '../helpers/connectRedis';

const userRepository = AppDataSource.getRepository(User);

export const createUser = async (input: Partial<User>) => {
    return await userRepository.save(userRepository.create(input));
};

export const findUserByEmail = async ({ email }: { email: string }) => {
    return await userRepository.findOneBy({ email });
};

export const findUserById = async (userId: number) => {
    return await userRepository.findOneBy({ id: userId });
};

export const findUser = async (query: Object) => {
    return await userRepository.findOneBy(query);
};
export const signTokens = async (user: User) => {
    // 1. Create Session
    // redisClient.set(user.id, JSON.stringify(user), {
    //     EX: config.get<number>('redisCacheExpiresIn') * 60,
    // });

    // 2. Create Access and Refresh tokens
    const access_token = signJwt({ user_profile: user }, 'TOKEN_KEY', {
        expiresIn: `${process.env.accessTokenExpiresIn}m`,
    });

    const refresh_token = signJwt({ user_profile: user }, 'REFRESH_TOKEN_KEY', {
        expiresIn: `${process.env.refreshTokenExpiresIn}m`,
    });

    return { access_token, refresh_token };
};
