import bcrypt from 'bcryptjs';
import { configs } from '../../configs/env';

export class PasswordHandler
{
	static async generateHash(password: string): Promise<string>
	{
		const salt = await bcrypt.genSalt(configs.saltRounds);
		const hashedPassword = await bcrypt.hash(password, salt);

		return hashedPassword;
	}

	static async validatePassword(password: string, hashedPassword: string)
	{
		return bcrypt.compare(password, hashedPassword);
	}
}
