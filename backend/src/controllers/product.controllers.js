import { deleteOnCloudinary, uploadOnCloudinary } from "../cloudinary/cloudinary.js"
import Product from "../models/product.model.js"
// import { asyncHandler } from "../utils/asyncHandler.js"
// import User from "../models/user.model.js"


// get all products controller
export const getProductsController = async (req, res) => {
	const products = await Product.find({}).populate('category')
	return res.status(200).json({ products })
}

// add product controller
export const addProductController = async (req, res) => {
	try {
		const {
			userId,
			name,
			title,
			description,
			category,
			price,
			colors,
			stock,
			productImage,
			shipping
		} = req.body
		if (
			name == "" ||
			title == "" ||
			description == "" ||
			category == "" ||
			price == "" ||
			colors == "" ||
			stock == "") {
			res.status(400).json({ success: false, message: "All fields are required !" })
		}


		// const product = await Product.findOne({ $or: [{ name }, { productImage }] })
		// const findByName = await Product.findOne({ name })
		// if (findByName) {
		// 	res.status(400).json({
		// 		success: false,
		// 		message: "Product already exists"
		// 	})
		// 	return;
		// }

		const filename = req.file?.path
		if (!filename) {
			res.status(400).json({
				success: false,
				message: "Please choose file"
			})
			return;
		}



		// upload image in cloudinary 
		const image = await uploadOnCloudinary(filename)

		const productdata = await Product({
			userId,
			name,
			title,
			// productImage: image,
			productImage: {
				public_id: image?.public_id,
				url: image?.url,
			},
			description,
			price,
			category,
			colors,
			stock,
			shipping
		})


		// const filename = req.file
		// if (filename) {
		// 	productdata.productImage = filename.path
		// }
		const product = await productdata.save()

		res.status(201).json({
			success: true,
			message: "Product created successfully",
			product
		})
	} catch (error) {
		res.status(501).json({
			success: false,
			message: "Something went wrong",
			error
		})

	}

}



// update product (get product by id and update)
export const getProductByIdController = async (req, res) => {
	try {
		// const productById = await Product.findOne({ _id: req.params.id })
		const productById = await Product.findById({ _id: req.params.id })

		if (productById) {
			res.status(200).json({
				success: true,
				message: "Successfully",
				productById
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


// update 
export const updateProductController = async (req, res) => {
	try {
		// const updateProduct = await Product.updateOne({ _id: req.params.id }, { $set: req.body })

		const product = await Product.findById(req.params.id)
		console.log(product);

		if (!product) {
			return res.status(404).json({
				success: false,
				message: "Update not found",
			})
			// console.log("updated : ", updateProduct);
		}

		await deleteOnCloudinary(product?.productImage?.public_id)

		let result
		if (req.file) {
			result = await uploadOnCloudinary(req.file?.path)
		}
		console.log(result);

		const userdata = {
			name: req.body.name || product.name,
			title: req.body.title || product.title,
			description: req.body.description || product.description,
			category: req.body.category || product.category,
			price: req.body.price || product.price,
			colors: req.body.colors || product.colors,
			stock: req.body.stock || product.stock,
			shipping: req.body.shipping || product.shipping,
			productImage: {
				public_id: result?.public_id,
				url: result?.secure_url,
			},
			// productImage: result
		}
		console.log(userdata);

		const data = await Product.findByIdAndUpdate(req.params.id, userdata, { new: true })

		if (data) {
			return res.status(200).json({ success: true, message: "Product updated successfully", data })
		}
	} catch (error) {
		res.status(501).json({
			success: false,
			message: "Something went wrong"
		})

	}

}


// export const updateProductImage = asyncHandler(async (req, res) => {
// 	const avatarLocalPath = req.file?.path

// 	if (!avatarLocalPath) {
// 		throw new ApiError(400, "Avatar file is missing")
// 	}

// 	//TODO: delete old image - assignment

// 	const avatar = await uploadOnCloudinary(avatarLocalPath)

// 	if (!avatar.url) {
// 		throw new ApiError(400, "Error while uploading on avatar")

// 	}

// 	const user = await Product.findByIdAndUpdate(
// 		req.user?._id,
// 		{
// 			$set: {
// 				avatar: avatar.url
// 			}
// 		},
// 		{ new: true }
// 	).select("-password")

// 	return res
// 		.status(200)
// 		.json(
// 			new ApiResponse(200, user, "Avatar image updated successfully")
// 		)
// })


// delete product
export const deteleProductByIdController = async (req, res) => {
	try {
		const product = await Product.findById(req.params.id)
		// const user = await User.findById(req.params.id)
		console.log(product);
		if (!product) {
			return res.status(404).json({ success: false, message: "Product not found" })
		}
		await deleteOnCloudinary(product?.productImage?.public_id)
		// await cloudinary.v2.uploader.upload.destroy(product.productImage.url)

		const productdata = await Product.deleteOne()
		if (productdata) {
			return res.status(200).json({ success: true, message: "Product deleted successfully" })
		}
	} catch (error) {
		res.status(500).json({ success: false, message: "Something went wrong" })
	}
}

// not working, we will see later
// search
export const searchProductController = async (req, res) => {
	try {
		const products = await Product.find({
			"$or": [
				{
					name: { $regex: req.params.key }
				},
				{
					category: { $regex: req.params.key }
				},
				// {
				// 	price: { $regex: req.params.key }
				// },
				// {
				// 	description: { $regex: req.params.key }
				// },
				// {
				// 	colors: { $regex: req.params.key }
				// },
			]
		})
		if (products) {
			res.json(products)
			console.log(products);
		}
		return res.json({ success: false, products, message: "Product not found" })

	} catch (error) {
		res.status(500).json({ success: false, message: "Something went wrong" })
	}
}