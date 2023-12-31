// import getLogs from './getLogs';
import express, { Request, Response } from 'express';
import allUsers from './allUsers';
import getUser from './getUser';
import setAvatar from './setAvatar';
import validateToken from './validateToken';

const router = express.Router();

router.get('/validateToken', validateToken);

router.post('/setAvatar', setAvatar);

router.get('/allUsers', allUsers);

router.get('/getUser', getUser);

router.all('*/*', (req: Request, res: Response)=>
{
	res.status(404).send('Not found');
});

export { router };