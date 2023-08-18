import { Schema, model } from 'mongoose';

const conversationSchema: Schema = new Schema(
{
	members:  [{
		type: String
	}],
	updatedAt: { type: Date, default: new Date() },
	createdAt: { type: Date, default: new Date() },
	isDeleted: { type: Boolean, default: false },
	isBot: { type: Boolean, default: false }
});

conversationSchema.pre('updateOne', function(next)
{
	this.set('updatedAt',  new Date());
	next();
});

conversationSchema.pre('updateOne', function(next)
{
	this.set('updatedAt',  new Date());
	next();
});

conversationSchema.pre('save', function(next)
{
	this.createdAt = new Date();
	this.updatedAt = new Date(),
	next();
});

const ConversationModel = model('Message', conversationSchema);

export { ConversationModel };
