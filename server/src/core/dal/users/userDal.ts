import { SetAvatarRequest } from '../../model/request/users/setAvatarRequest';
import { SignUpRequest } from '../../model/request/users/signupRequest';
import { ErrorCode } from '../../model/types/errorCode';
import { GetUserResponse } from '../../model/types/users/getUserResponse';

export interface UserDal
{
	getUserById(id: string): Promise<[ErrorCode, GetUserResponse]>

	getUserByEmail(email: string): Promise<[ErrorCode, GetUserResponse]>

	saveUserDetails(request: SignUpRequest)
		:Promise<[ErrorCode, string]>

	setAvatar(request: SetAvatarRequest)
		:Promise<ErrorCode>

	getAllUsers(userId: string)
		:Promise<GetUserResponse[]>

	// updateIsActive(userId: string, isActive: boolean): Promise<ErrorCode>
}
