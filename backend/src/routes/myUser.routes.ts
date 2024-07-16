import {Router} from 'express';
import {createCurrentUser} from '../controllers/myUser.controller';
import { jwtCheck } from '../middleware/auth';

const router = Router();

router.route('/').post(jwtCheck , createCurrentUser);

export default router