import jwt, { sign, verify, SignOptions } from 'jsonwebtoken';

export const signJwt = (payload: Object, keyName: 'TOKEN_KEY' | 'REFRESH_TOKEN_KEY', options: SignOptions) => {
    const privateKey = Buffer.from(process.env[keyName], 'base64').toString('ascii');
    return sign(payload, privateKey, {
        ...(options && options),
    });
};

export const verifyJwt = <T>(token: string, keyName: 'TOKEN_KEY' | 'REFRESH_TOKEN_KEY'): T | null => {
    try {
        const publicKey = Buffer.from(process.env[keyName], 'base64').toString('ascii');
        const decoded = verify(token, publicKey) as T;

        return decoded;
    } catch (error) {
        return null;
    }
};
