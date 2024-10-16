"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyJwt = exports.signJwt = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const signJwt = (payload, keyName, options) => {
    const privateKey = Buffer.from(process.env[keyName], 'base64').toString('ascii');
    return (0, jsonwebtoken_1.sign)(payload, privateKey, Object.assign({}, (options && options)));
};
exports.signJwt = signJwt;
const verifyJwt = (token, keyName) => {
    try {
        const publicKey = Buffer.from(process.env[keyName], 'base64').toString('ascii');
        const decoded = (0, jsonwebtoken_1.verify)(token, publicKey);
        return decoded;
    }
    catch (error) {
        return null;
    }
};
exports.verifyJwt = verifyJwt;
//# sourceMappingURL=jwt.js.map