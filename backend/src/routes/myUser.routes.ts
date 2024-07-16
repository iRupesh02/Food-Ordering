import {Router} from 'express';
import {createCurrentUser} from '../controllers/myUser.controller';

const router = Router();

router.route('/').post(createCurrentUser);

export default router