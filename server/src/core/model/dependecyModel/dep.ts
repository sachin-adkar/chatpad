import { ConversationsDal } from '../../dal/conversations/conversationDal';
import { UserDal } from '../../dal/users/userDal';

export interface Dep
{
	// Dals
	userModel?: UserDal;
	conversationModel?: ConversationsDal;
}