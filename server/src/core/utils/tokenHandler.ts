import jwt from 'jsonwebtoken';
import { configs } from '../../configs/env';
import { RefreshTokenResponse } from '../model/types/users/refreshTokenResponse';

export class TokenHandler
{
	static generateToken(userId: string, email: string): RefreshTokenResponse
	{
		const accessToken = jwt.sign(
			{
				userId, email,
			},
			configs.accessTokenSecret,
			{
				expiresIn: configs.accessTokenExpiry,
			});

		const refreshToken = jwt.sign(
			{
				userId,
				email,
			},
			configs.refreshTokenSecret,
			{
				expiresIn: configs.refreshTokenExpiry,
			});

		return { accessToken, refreshToken };
	}

	static decodeToken(token: string)
	{
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		const userData: any = jwt.decode(token);

		return {
			userId: userData.userId,
			email: userData.email };
	}

}