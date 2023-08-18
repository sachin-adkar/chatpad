export interface LoginSignupResponse
{
	name: string;
	userId: string;
	accessToken: string;
	refreshToken: string;
	email: string;
	isActive?: boolean;
	isAvatarSet?: boolean;
}
