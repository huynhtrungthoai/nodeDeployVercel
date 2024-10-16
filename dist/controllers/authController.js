"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logoutHandler = exports.loginHandler = exports.getMe = void 0;
exports.registerHandler = registerHandler;
const db_1 = require("../db");
const user_1 = require("../models/user");
const appError_1 = __importDefault(require("../helpers/appError"));
const userService_1 = require("../services/userService");
const cookiesOptions = {
    httpOnly: true,
    sameSite: 'lax',
};
const accessTokenCookieOptions = Object.assign(Object.assign({}, cookiesOptions), { expires: new Date(Date.now() + Number(process.env.accessTokenExpiresIn) * 60 * 1000), maxAge: Number(process.env.accessTokenExpiresIn) * 60 * 1000 });
const refreshTokenCookieOptions = Object.assign(Object.assign({}, cookiesOptions), { expires: new Date(Date.now() + Number(process.env.refreshTokenExpiresIn) * 60 * 1000), maxAge: Number(process.env.refreshTokenExpiresIn) * 60 * 1000 });
const getMe = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = res.locals.user;
        res.status(200).status(200).json({
            status: 'success',
            data: {
                user,
            },
        });
    }
    catch (err) {
        next(err);
    }
});
exports.getMe = getMe;
function registerHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const hashPassword = yield user_1.User.hashPassword(req.body.password);
        const user = yield db_1.AppDataSource.getRepository(user_1.User).save(Object.assign(Object.assign({}, req.body), { password: hashPassword }));
        res.json(user);
    });
}
const loginHandler = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const user = yield (0, userService_1.findUserByEmail)({ email });
        // 1. Check if user exist
        if (!user) {
            return next(new appError_1.default(400, 'Invalid email or password'));
        }
        // 2.Check if user is verified
        if (!user.verified) {
            return next(new appError_1.default(401, 'You are not verified, check your email to verify your account'));
        }
        //3. Check if password is valid
        if (!(yield user_1.User.comparePasswords(password, user.password))) {
            return next(new appError_1.default(400, 'Invalid email or password'));
        }
        // 4. Sign Access and Refresh Tokens
        const { access_token, refresh_token } = yield (0, userService_1.signTokens)(user);
        // // 5. Add Cookies
        res.cookie('access_token', access_token, accessTokenCookieOptions);
        res.cookie('refresh_token', refresh_token, refreshTokenCookieOptions);
        res.cookie('logged_in', true, Object.assign(Object.assign({}, accessTokenCookieOptions), { httpOnly: false }));
        // 6. Send response
        res.status(200).json({
            status: 'success',
            access_token,
        });
    }
    catch (err) {
        next(err);
    }
});
exports.loginHandler = loginHandler;
const logout = (res) => {
    res.cookie('access_token', '', { maxAge: 1 });
    res.cookie('refresh_token', '', { maxAge: 1 });
    res.cookie('logged_in', '', { maxAge: 1 });
};
const logoutHandler = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = res.locals.user;
        //   await redisClient.del(user.id);
        logout(res);
        res.status(200).json({
            status: 'success',
        });
    }
    catch (err) {
        next(err);
    }
});
exports.logoutHandler = logoutHandler;
//# sourceMappingURL=authController.js.map