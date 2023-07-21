import exprss, {Request, Response} from 'express';
import {body} from 'express-validator';
import { validateRequest } from '../middlewares/validate-request';
import { User } from '../models/user';
import { BadRequestError } from '../errors/bad-request-error';
import { Password } from '../services/password';
import jwt from 'jsonwebtoken';

const router = exprss.Router();

router.post('/api/users/signin', [
    body('email')
        .isEmail()
        .withMessage('Email must be valid'),
    body('password')
        .trim()
        .notEmpty()
        .withMessage('You must supply a password')
],
validateRequest,
    async (req: Request, res: Response) => {
        const {email, password} = req.body;
        const existingUser = await User.findOne({email});
        if(!existingUser) {
            throw new BadRequestError("You don't have an account with us.");
        }
        const matchPwd = await Password.compare(existingUser.password, password);
        if(!matchPwd) {
            throw new BadRequestError("Invalid credentials");
        }
        //Generate JWT
        const jwtOfUser = jwt.sign({
            id: existingUser.id,
            email: existingUser.email
        }, process.env.JWT_KEY!);

        //Store the token on session object
        req.session = {
            jwt: jwtOfUser
        };

        res.status(201).send(existingUser);
});

export { router as signinRouter };