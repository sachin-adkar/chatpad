/* eslint-disable max-len */
import { ErrorCode } from '../types/errorCode';

export class ErrorCodes
{
	public static OK: ErrorCode = { code: '00', description: 'Success', error: '' };
	
	public static Failed: ErrorCode = { code: 'F01', description: 'Failed', error: 'BadRequest' };
	
	public static DataNotFound: ErrorCode = { code: 'F02', description: 'Data not found', error: 'BadRequest'};
	
	public static SomethingWentWrong: ErrorCode = { code: 'F03', description: 'Something went wrong', error: 'BadRequest' };
	
	public static NotFound:  ErrorCode = { code: 'F04', description: 'Route Not found', error: 'BadRequest' };

	// User related
	public static InvalidEmail: ErrorCode = { code: 'U01', description: 'Please enter a valid email', error: 'BadRequest'};
	
	public static InvalidUserId: ErrorCode = { code: 'U02', description: 'User ID is invalid', error: 'BadRequest' };
	
	public static InsufficientPermissions: ErrorCode = { code: 'U03', description: 'You do not have permissions to perform this action', error: 'BadRequest' };
	
	public static UserNotFound: ErrorCode = { code: 'U04', description: 'User not found', error: 'BadRequest' };
	
	public static FailedToAddUser: ErrorCode = { code: 'U05', description: 'Failed to add user', error: 'DataFeedError' };
	
	public static EmailAlreadyAdded: ErrorCode = { code: 'U05', description: 'Email is already added', error: 'BadRequest'};
	
	public static InvalidName: ErrorCode = { code: 'U06', description: 'Name is required', error: 'BadRequest'};
	
	public static NoSpace: ErrorCode = { code: 'U07', description: 'Password cannot contain spaces', error: 'BadRequest'};
	
	public static InvalidPassword: ErrorCode = { code: 'U08',
		description: `Password must contain
				Minimum six in length,
				At least one special character,
				At least one digit,
				At least one lower case English letter,
				At least one upper case`, error: 'BadRequest'};

	public static EmailAlreadyTaken: ErrorCode = { code: 'U08', description: 'Email address is already registered with us', error: 'BadRequest'};
	
	public static Unauthorized: ErrorCode = { code: 'U09', description: 'Invalid credentials', error: 'BadRequest'};
	
	public static EmptyPassword: ErrorCode = { code: 'U10', description: 'Password cannot be empty', error: 'BadRequest'};
	
	public static InvalidParams: ErrorCode = { code: 'U11', description: 'Recieved invalid parameters', error: 'BadRequest'};
	
	public static InvalidAuthCode: ErrorCode = { code: 'U10', description: 'Auth Code cannot be empty', error: 'BadRequest'};
	
	public static Forbidden: ErrorCode = { code: 'U11', description: 'You do not have access to this resource, please contact the admin', error: 'BadRequest'};

	public static FailedToUpdateUser: ErrorCode = { code: 'F13', description: 'Failed to update User details', error: 'BadRequest' };

	public static AccountDisabled: ErrorCode = { code: 'F14', description: 'Account is disabled, please contact admin', error: 'BadRequest' };

	public static FailedToUpdateUserDetails: ErrorCode = { code: 'F20', description: 'Failed to update user details', error: 'BadRequest' };
	
	public static InvalidAvatar: ErrorCode = { code: 'F21', description: 'Invalid avatar', error: 'BadRequest'};

	public static FailedToUploadAvatar: ErrorCode = { code: 'F22', description: 'Avatar upload failed!', error: 'BadRequest'};
}
