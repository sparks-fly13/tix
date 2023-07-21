import exprss, {Request, Response} from 'express';
import { body } from 'express-validator';
import jwt from 'jsonwebtoken';
import { validateRequest } from '../middlewares/validate-request';
import { BadRequestError } from '../errors/bad-request-error';
import { User } from '../models/user';

const router = exprss.Router();

router.post('/api/users/signup', [
        body('email')
            .isEmail()
            .withMessage('Email must be valid'),
        body('password')
            .trim()
            .isLength({ min: 6, max: 16 })
            .withMessage('Password must be between 6 and 16 characters')
    ],
    validateRequest,
    async (req: Request, res: Response) => {
        const {email, password} = req.body;
        const existingUser = await User.findOne({email});

        if(existingUser) {
            throw new BadRequestError('The email already exists');
        }

        const user = User.build({email, password});
        await user.save();

        //Generate JWT
        const jwtOfUser = jwt.sign({
            id: user.id,
            email: user.email
        }, process.env.JWT_KEY!);

        //Store the token on session object
        req.session = {
            jwt: jwtOfUser
        };

        res.status(201).send(user);
});

export { router as signupRouter };