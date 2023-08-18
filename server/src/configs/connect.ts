import mongoose from 'mongoose';
import { configs } from './env';

mongoose.set('strictQuery', false);

export default async function()
{
	return await mongoose.connect(configs.dbUrl);
}
