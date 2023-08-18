// import getLogs from './getLogs';
import express, { Request, Response } from 'express';
import conversations from './conversations';

const router = express.Router();

router.get('/conversations', conversations);

router.all('*/*', (req: Request, res: Response)=>
{
	res.status(404).send('Not found');
});

export { router };