import express, {json} from 'express';
import 'express-async-errors';
import cookieSession from 'cookie-session';
import { currentUserRouter } from './Routes/currentuser';
import { signinRouter } from './Routes/signin';
import { signupRouter } from './Routes/signup';
import { signoutRouter } from './Routes/signout';
import { errHandler } from './middlewares/error-handler';
import { RoutingError } from './errors/routing-error';

const app = express();
app.set('trust proxy', true);
app.use(json());
app.use(cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== 'test'
}));

app.use(currentUserRouter);
app.use(signinRouter);
app.use(signupRouter);
app.use(signoutRouter);

app.all('*', async (req, res) => {
    throw new RoutingError();
});

app.use(errHandler);

export {app};