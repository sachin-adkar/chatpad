import { Router } from 'express';
import { router as openRoute } from  './api/open/router';
import { router as userRoute } from  './api/protected/users/router';
import { router as chatRoute } from  './api/protected/chat/router';
import { authorize } from './middlewares/auth';

export default (app: Router): void =>
{
	app.use('/open', openRoute);

	// Protected routes
	app.use('/user', authorize, userRoute);
	app.use('/chat', authorize, chatRoute);
};
