import express, { NextFunction, Request, Response } from 'express';
import http from 'http';
import cors from 'cors';
import bodyParser from 'body-parser';
import { configs } from './configs/env';
import connect from './configs/connect';
import router from './routing';
import { Logger } from './middlewares/logger';
import { ExpressRequest, ExpressResponse } from './core/model/types/expressExtention';

const app = express();

/**
 * Create HTTP server.
 */
const server = new http.Server(app);
server.on('error', onError);
server.on('listening', onListening);

/**
 * Connect to MongoDB
 */
connect()
.then(()=>
{
	server.listen(configs.port || 1337);
})
.catch(error =>
{
	console.log('Failed to connect to DB', error);
})

// Middlewares go here
app.use(bodyParser.json());
app.use(cors());

app.use((req: any, res: ExpressResponse, next: NextFunction) =>
{
	req.logger = new Logger();
	req.logger.log(`Incoming request | Method: ${req.method} | URL: ${req.url}`, 'INFO', req.body);
	next();
});

app.get('/health', (_req, res) =>
{
	res.send('Server is up and running');
});

// app.use(express.static(path.join(__dirname, './build')));


router(app);



// eslint-disable-next-line @typescript-eslint/no-explicit-any
function onError(error: any)
{
	if (error.syscall !== 'listen')
	{
		throw error;
	}

	// handle specific listen errors with friendly messages
	switch (error.code)
	{
	case 'EACCES':
		// console.error('Port ' + configs.port + ' requires elevated privileges');
		process.exit(1);
		break;
	case 'EADDRINUSE':
		// console.error('Port ' + configs.port + ' is already in use');
		process.exit(1);
		break;
	default:
		throw error;
	}
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening()
{
	console.log('Server is up and running on :', configs.port);
}

process.on('uncaughtException', (error: any, origin: any) =>
{
	console.log('Uncaught exception', 'ERROR', error);
	console.log('Uncaught exception', 'ERROR', origin);
});

process.on('unhandledRejection', (error: any, origin: any) =>
{
	console.log('Unhandled rejection', 'ERROR', error);
	console.log('Unhandled rejection', 'ERROR', origin);
});