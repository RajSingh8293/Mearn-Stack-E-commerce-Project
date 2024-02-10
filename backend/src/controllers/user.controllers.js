import jwt from "jsonwebtoken"
import bcryptjs from 'bcryptjs'
import { asyncHandler } from "../utils/asyncHandler.js"
import User from "../models/user.model.js"

// get users 
export const getAllUsers = asyncHandler(async (req, res) => {
	const users = await User.find({})
	return res.status(200).json({ users })
})

// register
export const registerUser = asyncHandler(async (req, res) => {
	const { username, email, password } = req.body;


	if (!username) {
		return res.status(422).json({ message: 'Username is required !' })

	}
	if (!email) {
		return res.status(422).json({ message: 'Email is required !' })

	}
	if (!password) {
		return res.status(422).json({ message: 'Password is required !' })

	}

	try {
		// existing user
		const existsUser = await User.findOne({ email })
		// const existsUser = await User.findOne({ $or: [{ username }, { email }] })
		if (existsUser) {
			return res.status(400).json({ success: false, message: 'User already exists !' })

		}

		const hashPassword = bcryptjs.hashSync(password, 8)
		const userdata = new User({
			username,
			email,
			password: hashPassword,
		})

		const user = await userdata.save()
		const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '2d' })

		const { password: pass, ...rest } = user._doc //  hide passwrod
		res.status(201).json(
			{
				success: true,
				message: "Registered successfully",
				user: rest, token: token
			})


	} catch (error) {
		res.status(500).json(
			{
				success: false,
				message: "Something went wrong",
				error
			})

	}


})



// // login
export const loginUser = asyncHandler(async (req, res) => {
	const { username, email, password } = req.body
	if (!password) {
		return res.status(404).json({ success: false, message: 'Password is required !' })

	}
	if (!username && !email) {
		// if (!(username && email)) {
		return res.status(404).json({ success: false, message: 'Username or email is required !' })
	}

	try {
		const user = await User.findOne({ $or: [{ username }, { email }] })
		if (!user) {
			res.status(400).send({
				success: false,
				message: 'User does not exists'
			})
		}

		const isMatch = bcryptjs.compareSync(password, user.password)
		if (!isMatch) {
			res.status(400).send({
				success: false,
				message: 'Invalid password !'
			})
		}

		const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' },)


		const { password: pass, ...rest } = user._doc // hide password
		res.status(200)
			.json({
				success: true,
				message: "Logged in successfully",
				user: rest,
				token

			})

	} catch (error) {
		res.status(400).json({ success: false, message: "Error with registration", error })
	}

})


// get user by id
export const getUserByIdController = async (req, res) => {
	try {
		// const productById = await Product.findOne({ _id: req.params.id })
		const user = await User.findById({ _id: req.params.id })

		if (user) {
			res.status(200).json({
				success: true,
				message: "Successfully",
				user
			})
			return;
		}
		res.status(200).json({
			success: false,
			message: "Product not found",
		})

	} catch (error) {
		res.status(501).json({
			success: false,
			message: "Something went wrong"
		})

	}

}

// get user by id
export const deleteUserByIdController = async (req, res) => {
	try {
		// const productById = await Product.findOne({ _id: req.params.id })
		const user = await User.findById({ _id: req.params.id })

		if (!user) {
			return res.status(404).json({ success: false, message: "User not found" })
		}

		const userById = await user.deleteOne()
		if (userById) {
			return res.status(200).json({
				success: true,
				message: "User deleted Successfully",
			})
		}
		res.status(200).json({
			success: false,
			message: "Product not found",
		})

	} catch (error) {
		res.status(501).json({
			success: false,
			message: "Something went wrong"
		})

	}

}