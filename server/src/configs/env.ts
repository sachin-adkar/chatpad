import path from 'path';
import dotenv from 'dotenv';

dotenv.config({ path: path.resolve(process.cwd(), '.env')});

export const configs =
{
	port: Number(process.env.PORT) || 1337,
	dbUrl: process.env.DB_URL,

	accessTokenSecret: process.env.ACCESS_TOKEN_SECRET,
	refreshTokenSecret: process.env.REFRESH_TOKEN_SECRET,
	saltRounds: 10,
	refreshTokenExpiry: '4200s',
	accessTokenExpiry: '3600s'
}