import { Router } from 'express';
import { deserializeUser } from '../middleware/deserializeUser';
import { requireUser } from '../middleware/requireUser';
import { validate } from '../middleware/validate';
import { createUserSchema, loginUserSchema, verifyEmailSchema } from '../schemas/user.schema';
import * as AuthController from '../controllers/authController';

const router = Router();
const ROUTE_PREFIX = 'api';

// Register user
router.post(`/${ROUTE_PREFIX}/register`, validate(createUserSchema), AuthController.registerHandler);

// Login user
router.post(`/${ROUTE_PREFIX}/login`, validate(loginUserSchema), AuthController.loginHandler);

// Logout user
router.get(`/${ROUTE_PREFIX}/logout`, requireUser, AuthController.logoutHandler);

// Refresh access token
// router.get(`/${ROUTE_PREFIX}/refresh`, refreshAccessTokenHandler);

export default router;
