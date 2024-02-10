import mongoose from 'mongoose'


const userSchema = new mongoose.Schema(
	{
		username: {
			type: String,
			required: true,
			unique: true,
		},
		email: {
			type: String,
			unique: true,
			required: true,
			trim: true,
		},
		password: {
			type: String,
			required: true
		},

		role: {
			type: String,
			default: "User"
		},
	},
	{ timestamps: true },
)

const User = mongoose.model('User', userSchema)
export default User