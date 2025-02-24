import express from 'express';
import { register, login, current } from '../controller/authController.js';
import passport from '../config/passport-config.js';
import { validateDto } from '../middlewares/validate-dto.middleware.js'; 
import { registerDto } from '../dto/userregister.dto.js';

const router = express.Router();

router.post('/register', validateDto(registerDto), register);

router.post('/login', login);

router.get('/current', passport.authenticate('jwt', { session: false }), current);

export default router;
