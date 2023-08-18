export interface GetUserResponse
{
	name: string;
	email: string;
	password?: string;
	userId?: string;
	isActive?: boolean;
	isAvatarSet?: boolean;
	avatar?: string;
}
