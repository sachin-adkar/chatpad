import { UserDal } from '../../dal/users/userDal';

export interface Dep
{
	// Dals
	userModel?: UserDal;
}