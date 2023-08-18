import { Schema, model } from 'mongoose';

const userSchema: Schema = new Schema({
	name: String,
	email:
	{
		type: String,
		required: true,
		unique: true,
	},
	password:
	{
		type: String,
		default: '',
	},
	isAvatarSet:
	{
		type: Boolean,
		default: false,
	},
	avatar:
	{
		type: String,
		default: '',
	},
	updatedAt: Date,
	isActive: { type: Boolean, default: true }
});

userSchema.pre('updateOne', function(next)
{
	this.set('updatedAt',  new Date());
	next();
});

userSchema.pre('updateOne', function(next)
{
	this.set('updatedAt',  new Date());
	next();
});

userSchema.pre('save', function(next)
{
	this.createdAt = new Date();
	this.updatedAt = new Date(),
	next();
});

const UserModel = model('Users', userSchema);

export { UserModel };