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
exports.getMeHandler = void 0;
exports.getUsers = getUsers;
exports.getHome = getHome;
exports.getMe = getMe;
const db_1 = require("../db");
const user_1 = require("../models/user");
function getUsers(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const users = yield db_1.AppDataSource.getRepository(user_1.User).find();
        res.json(users);
    });
}
function getHome(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        res.send('Express on Vercel s');
    });
}
function getMe(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const users = yield db_1.AppDataSource.getRepository(user_1.User).find();
        res.json(users);
    });
}
const getMeHandler = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = res.locals.user;
        res.status(200)
            .status(200)
            .json({
            status: 'success',
            data: Object.assign({}, user),
        });
    }
    catch (err) {
        next(err);
    }
});
exports.getMeHandler = getMeHandler;
//# sourceMappingURL=userController.js.map