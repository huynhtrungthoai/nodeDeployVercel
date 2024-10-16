"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const requireUser_1 = require("../middleware/requireUser");
const validate_1 = require("../middleware/validate");
const user_schema_1 = require("../schemas/user.schema");
const AuthController = __importStar(require("../controllers/authController"));
const router = (0, express_1.Router)();
const ROUTE_PREFIX = 'api';
// Register user
router.post(`/${ROUTE_PREFIX}/register`, (0, validate_1.validate)(user_schema_1.createUserSchema), AuthController.registerHandler);
// Login user
router.post(`/${ROUTE_PREFIX}/login`, (0, validate_1.validate)(user_schema_1.loginUserSchema), AuthController.loginHandler);
// Logout user
router.get(`/${ROUTE_PREFIX}/logout`, requireUser_1.requireUser, AuthController.logoutHandler);
// Refresh access token
// router.get(`/${ROUTE_PREFIX}/refresh`, refreshAccessTokenHandler);
exports.default = router;
//# sourceMappingURL=authRoute.js.map