import { Router } from 'express';
import { router as openRoute} from  './api/open/router';
import { router as protectedRote} from  './api/protected/router';
import { authorize } from './middlewares/auth';

export default (app: Router): void =>
{
	app.use('/open', openRoute);
	app.use('/protected', authorize, protectedRote);
};
