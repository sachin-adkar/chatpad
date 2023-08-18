import { ErrorCodes } from '../../model/codes/errorCodes';
import { MongoErrors } from '../../model/codes/mongoErrorCodes';
import { SignUpRequest } from '../../model/request/users/signupRequest';
import { ErrorCode } from '../../model/types/errorCode';
import { GetUserResponse } from '../../model/types/users/getUserResponse';
import { UserModel } from './schema';
import { GetUsers } from '../../model/types/users/getUser';
import { Logger } from '../../../middlewares/logger';
import { UserDal } from './userDal';
import { SetAvatarRequest } from '../../model/request/users/setAvatarRequest';

export class User implements UserDal
{
	public readonly logger: Logger;

	constructor (logger: Logger)
	{
		this.logger = logger;
	}

	async getUserById(id: string): Promise<[ErrorCode, GetUserResponse]>
	{
		try
		{
			this.logger.log('DAL | Users | Processing(getUserById)', 'INFO');
			const user = await UserModel.findOne({ _id: id }).exec();

			if (user)
			{
				const userDetails: GetUserResponse =
				{
					email: user.email,
					name: user.name,
					password: user.password
				};

				return [ErrorCodes.OK, userDetails];
			}

			return [ErrorCodes.UserNotFound, undefined];
		}
		catch (error)
		{
			// console.log('DAL: Error occured while fetching user by Id', error);
			this.logger.log('DAL | Users | getUserById', 'ERROR', error);
			if (error.kind === MongoErrors.OBJECT_ID)
			{
				throw ErrorCodes.InvalidUserId;
			}
			return [ErrorCodes.SomethingWentWrong, undefined];
		}
	}

	async getUserByEmail(email: string): Promise<[ErrorCode, GetUserResponse]>
	{
		try
		{
			this.logger.log('DAL : Users : Processing(getUserByEmail)', 'INFO');
			const user = await UserModel.findOne({ email: email }).exec();

			if (user)
			{
				const userDetails: GetUserResponse =
				{
					email: user.email,
					name: user.name,
					password: user.password,
					userId: user.id,
					isActive: user.isActive,
					isAvatarSet: user.isAvatarSet
				};

				return [ErrorCodes.OK, userDetails];
			}

			return [ErrorCodes.UserNotFound, undefined];
		}
		catch (error)
		{
			// console.log('DAL: Error occured while fetching user by Email', error);
			this.logger.log('DAL | Users | getUserByEmail', 'ERROR', error);
			return [ErrorCodes.SomethingWentWrong, undefined];
		}
	}

	async updateUserDetails(request: SignUpRequest)
	: Promise<[ErrorCode, GetUserResponse]>
	{
		try
		{
			this.logger.log('DAL : Users : Processing(updateUserDetails)', 'INFO');

			const userDetails = await UserModel.findOneAndUpdate(
				{
					email: request.email
				},
				{
					$set: request
				},
				{
					upsert: true,
					returnOriginal:false,
				}).exec();

			if (userDetails?.name || userDetails?.email)
			{
				return [ErrorCodes.OK,
					{
						name: userDetails.name,
						email: userDetails.email,
						userId: userDetails.id,
					}];
			}

			throw ErrorCodes.FailedToUpdateUserDetails;
		}
		catch (error)
		{
			this.logger.log('DAL : Users => updateUserDetails', 'Error', error);
			return [ErrorCodes.Failed, undefined];
		}
	}

	async saveUserDetails(request: SignUpRequest)
		:Promise<[ErrorCode, string]>
	{
		try
		{
			this.logger.log('DAL : Users : Processing(saveUserDetails)', 'INFO');
			const data = new UserModel(
				{
					name: request.name,
					email: request.email,
					password: request.password,
					isActive: true,
				});

			const userDetails = await data.save();

			return [ErrorCodes.OK, userDetails.id];
		}
		catch (error)
		{
			// console.log('DAL: Error occured while saving the user details', error);
			this.logger.log('DAL | Users | saveUserDetails', 'ERROR', error);
			if (error.code == MongoErrors.DUP_KEY)
			{
				return [ ErrorCodes.EmailAlreadyTaken, undefined ];
			}
			return [ErrorCodes.SomethingWentWrong, undefined];
		}
	}

	async getUsers(): Promise<GetUsers[]>
	{
		const users = [];

		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		const results: any = await UserModel.find().exec();

		if (results)
		{
			for (const user of results)
			{
				users.push(
					{
						id: user.id,
						name: user.name,
						email: user.email,
						isActive: user.isActive,
						isAvatarSet: user.isAvatarSet,
					}
				);
			}
		}

		return users;
	}

	async setAvatar(request: SetAvatarRequest): Promise<ErrorCode>
	{
		try
		{
			const result = await UserModel.updateOne({ _id: request.userId },
				{
					$set:
					{
						avatar: request.avatar,
						isAvatarSet: true
					}
				}).exec();

			if (result.modifiedCount)
			{
				return ErrorCodes.OK;
			}

			this.logger.log('DAL | Users | SetAvatar', 'ERROR', ErrorCodes.FailedToUploadAvatar);
			return ErrorCodes.FailedToUploadAvatar;
		}
		catch(error)
		{
			this.logger.log('DAL | Users | SetAvatar', 'ERROR', error);

			return ErrorCodes.FailedToUploadAvatar;
		}
	}

	async getAllUsers(userId: string): Promise<GetUserResponse[]> {
		try {
			const users: GetUserResponse[] = [];
			const result = await UserModel.find({ _id: { $ne: userId }, isActive: true }).exec();
	
			for (const user of result)
			{
				users.push(
					{
						userId: user.id,
						name: user.name,
						email: user.email,
						avatar: user.avatar
					}
				);
			}
	
			return users;
		} catch (error)
		{
			
		}
	}

	async updateIsActive(userId: string, isActive: boolean): Promise<ErrorCode>
	{
		try
		{
			const result = await UserModel.updateOne({ _id: userId },
				{
					$set:
					{
						isActive
					}
				}).exec();

			if (result.modifiedCount)
			{
				return ErrorCodes.OK;
			}

			this.logger.log('DAL | Users | Update IsActive', 'ERROR', ErrorCodes.FailedToUpdateUser);
			return ErrorCodes.FailedToUpdateUser;
		}
		catch(error)
		{
			this.logger.log('DAL | Users | Update IsActive', 'ERROR', error);

			return ErrorCodes.FailedToUpdateUser;
		}
	}

		// async changePassword(email: string, password: string): Promise<ErrorCode>
	// {
	// 	try
	// 	{
	// 		this.logger.log('DAL | Users | Processing(changePassword)', 'INFO');
	// 		const response = await UserModel.updateOne({ email },
	// 			{
	// 				$set: { password, otp: {}  },
	// 			}).exec();

	// 		if (response.modifiedCount)
	// 		{
	// 			return ErrorCodes.OK;
	// 		}

	// 		return ErrorCodes.FailedToChangepassword;
	// 	}
	// 	catch(error)
	// 	{
	// 		// console.log('DAL: Failed to save password', error);
	// 		this.logger.log('DAL | Users | changePassword', 'ERROR', error);

	// 		return ErrorCodes.FailedToChangepassword;
	// 	}
	// }
}