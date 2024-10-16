import { Router } from 'express';
import * as UserController from '../controllers/userController';
import { deserializeUser } from '../middleware/deserializeUser';
import { requireUser } from '../middleware/requireUser';

const router = Router();

const ROUTE_PREFIX = 'api';
router.get('/', UserController.getHome);
router.get(`/${ROUTE_PREFIX}/users`, UserController.getUsers);
router.get(`/${ROUTE_PREFIX}/me`, deserializeUser, requireUser, UserController.getMeHandler);

export default router;
