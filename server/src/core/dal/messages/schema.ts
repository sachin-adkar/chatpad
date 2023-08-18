import { Schema, model } from 'mongoose';

const messageSchema: Schema = new Schema(
{
	conversationId: String,
	author: String,
	body: String,
	media: String,
	time: { type: Date, default: new Date()},
	isDeleted: { type: Boolean, default: false },
});

messageSchema.pre('save', function(next)
{
	this.time = new Date();
	next();
});

const MessagesModel = model('Message', messageSchema);

export { MessagesModel };