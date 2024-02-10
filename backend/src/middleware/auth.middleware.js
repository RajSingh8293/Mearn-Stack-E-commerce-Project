import jwt from 'jsonwebtoken'
import { asyncHandler } from '../utils/asyncHandler.js';
import User from '../models/user.model.js';


// check authentication user
export const verifyToken = asyncHandler(async (req, res, next) => {
	try {
		let token = req.headers["authorization"]
		// console.log("This is Token : ", token);
		if (token) {
			token = token.split(' ')[1]
			const decodeToken = jwt.verify(token, process.env.JWT_SECRET)
			// req.user = decodeToken
			req.user = await User.findById(decodeToken._id)
			// console.log("decoded : ", decodeToken);
			return next()
		} else {
			return res.status(400).json({ success: false, message: "Please provide token" })
		}
	} catch (error) {
		res.status(201).json({ success: false, message: "Something went wrong please try after sometime" })
	}
})



// admin middleware
export const isAdmin = asyncHandler(async (req, res, next) => {
	try {
		const user = await User.findById(req.user._id)
		// console.log("User ID : ", user);
		if (user.role != "Admin") {
			return res.status(400).send({
				success: false,
				message: "Unauthorized user !",
			}
			)

		} else {
			return next()
		}

	} catch (error) {
		res.status(501).send({
			success: false,
			message: "Error in middleware",
			error,
		}
		)

	}
})



// import { ApiError } from "../utils/ApiError.js";

// export const verifyJWT = asyncHandler(async (req, _, next) => {
// 	try {
// 		const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "")

// 		// console.log(token);
// 		if (!token) {
// 			throw new ApiError(401, "Unauthorized request")
// 		}

// 		const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)


// 		if (!user) {

// 			throw new ApiError(401, "Invalid Access Token")
// 		}

// 		req.user = user;
// 		next()
// 	} catch (error) {
// 		throw new ApiError(401, error?.message || "Invalid access token")
// 	}

// })