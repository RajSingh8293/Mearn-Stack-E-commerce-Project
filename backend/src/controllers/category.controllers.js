import Category from "../models/category.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";

// add category 
export const addCategoryController = asyncHandler(async (req, res) => {

	try {
		const { name } = req.body;
		if (!name) {
			res.status(401).json({
				message: "Name is required"
			})
		}

		const existCategory = await Category.findOne({ name })
		if (existCategory) {
			res.status(200).send({
				success: true,
				message: "Category already exists"
			})
		}

		const category = await Category({ name })
		const categorydata = await category.save();
		res.status(200).send({
			success: true,
			message: "Category created successfully",
			categorydata
		})

	} catch (error) {
		console.log(error);
		res.status(500).send({
			success: false,
			message: "Error in category",
			error,
		})

	}

})


// update catgeory 
export const updateCategoryController = async (req, res) => {
	try {
		// const { name } = req.body
		// const { id } = req.params
		// const category = await Category.findByIdAndUpdate(id { name } { new: true })
		let category = await Category.updateOne({ _id: req.params.id }, { $set: req.body })
		res.status(200).send({
			success: true,
			message: "Updated categeory",
			category
		})

	} catch (error) {
		console.log(error);
		res.status(500).send({
			success: false,
			message: "Error in category",
			error,
		})

	}
}

// get category by id 
export const getCategoryByIdController = async (req, res) => {
	try {
		const category = await Category.findOne({ _id: req.params.id })
		res.status(200).send({
			success: true,
			message: "Single product",
			category
		})

	} catch (error) {
		res.status(500).send({
			success: false,
			message: "Something went wrong",
			error
		})

	}

}


// delete category by id 
export const deleteCategoryByIdController = async (req, res) => {
	try {
		// const categpry = await Category.findByIdAndDelete({ _id: req.params.id })
		const categpry = await Category.deleteOne({ _id: req.params.id })

		res.status(200).send({
			success: true,
			message: "Category deleted successfully",
			categpry
		})

	} catch (error) {
		res.status(500).send({
			success: false,
			message: "Something went wrong",
			error

		})

	}
}


// get all categories 
export const getAllCategoryController = async (req, res) => {
	try {
		const categories = await Category.find({})
		if (categories) {

			return res.status(200).send({
				success: true,
				message: "All categories list",
				categories
			})
		}

	} catch (error) {
		res.status(500).send({
			success: false,
			message: "Something went wrong",
			error
		})
	}

}