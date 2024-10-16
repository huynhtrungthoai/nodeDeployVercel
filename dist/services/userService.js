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
Object.defineProperty(exports, "__esModule", { value: true });
exports.signTokens = exports.findUser = exports.findUserById = exports.findUserByEmail = exports.createUser = void 0;
const db_1 = require("../db");
const jwt_1 = require("../helpers/jwt");
const user_1 = require("../models/user");
const userRepository = db_1.AppDataSource.getRepository(user_1.User);
const createUser = (input) => __awaiter(void 0, void 0, void 0, function* () {
    return yield userRepository.save(userRepository.create(input));
});
exports.createUser = createUser;
const findUserByEmail = (_a) => __awaiter(void 0, [_a], void 0, function* ({ email }) {
    return yield userRepository.findOneBy({ email });
});
exports.findUserByEmail = findUserByEmail;
const findUserById = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield userRepository.findOneBy({ id: userId });
});
exports.findUserById = findUserById;
const findUser = (query) => __awaiter(void 0, void 0, void 0, function* () {
    return yield userRepository.findOneBy(query);
});
exports.findUser = findUser;
const signTokens = (user) => __awaiter(void 0, void 0, void 0, function* () {
    // 1. Create Session
    // redisClient.set(user.id, JSON.stringify(user), {
    //     EX: config.get<number>('redisCacheExpiresIn') * 60,
    // });
    // 2. Create Access and Refresh tokens
    const access_token = (0, jwt_1.signJwt)({ user_profile: user }, 'TOKEN_KEY', {
        expiresIn: `${process.env.accessTokenExpiresIn}m`,
    });
    const refresh_token = (0, jwt_1.signJwt)({ user_profile: user }, 'REFRESH_TOKEN_KEY', {
        expiresIn: `${process.env.refreshTokenExpiresIn}m`,
    });
    return { access_token, refresh_token };
});
exports.signTokens = signTokens;
//# sourceMappingURL=userService.js.map