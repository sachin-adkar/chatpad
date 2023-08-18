// import getLogs from './getLogs';
import express, { Request, Response } from 'express';
import login from './login';
import register from './register';

const router = express.Router();

router.post('/register', register);

router.post('/login', login);

router.all('*/*', (req: Request, res: Response)=>
{
	res.status(404).send('Not found');
});

export { router };