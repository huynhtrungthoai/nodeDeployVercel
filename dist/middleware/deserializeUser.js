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
exports.deserializeUser = void 0;
const appError_1 = __importDefault(require("../helpers/appError"));
const jwt_1 = require("../helpers/jwt");
const userService_1 = require("../services/userService");
const deserializeUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    try {
        let access_token;
        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            access_token = req.headers.authorization.split(' ')[1];
        }
        else if ((_a = req.cookies) === null || _a === void 0 ? void 0 : _a.access_token) {
            access_token = (_b = req.cookies) === null || _b === void 0 ? void 0 : _b.access_token;
        }
        if (!access_token) {
            return next(new appError_1.default(401, 'You are not logged in'));
        }
        // Validate the access token
        const decoded = (0, jwt_1.verifyJwt)(access_token, 'TOKEN_KEY');
        if (!decoded) {
            return next(new appError_1.default(401, `Invalid token or user doesn't exist`));
        }
        // Check if the user has a valid session
        // const session = await redisClient.get(decoded.sub);
        // if (!session) {
        //     return next(new AppError(401, `Invalid token or session has expired`));
        // }
        // Check if the user still exist
        const user = yield (0, userService_1.findUserById)((_c = decoded === null || decoded === void 0 ? void 0 : decoded.user_profile) === null || _c === void 0 ? void 0 : _c.id);
        if (!user) {
            return next(new appError_1.default(401, `Invalid token or session has expired`));
        }
        // Add user to res.locals
        res.locals.user = user;
        next();
    }
    catch (err) {
        next(err);
    }
});
exports.deserializeUser = deserializeUser;
//# sourceMappingURL=deserializeUser.js.map