import mongoose from "mongoose"

const ProductSchema = new mongoose.Schema(
	{
		userId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
			required: true,
		},

		name: {
			type: String,
			required: true,
			trim: true,
		},
		title: {
			type: String,
			required: true,
		},
		// productImage: {
		// 	public_id: {
		// 		type: String,
		// 		required: true,
		// 	},
		// 	url: {
		// 		type: String,
		// 		required: true,
		// 	},

		// },
		productImage: {
			public_id: {
				type: String,
				required: true,
			},
			url: {
				type: String,
				required: true,
			},
		},
		description: {
			type: String,
			required: true,
		},
		category: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Category",
			required: true,
		},
		price: {
			type: Number,
			required: true,
			default: 0
		},
		colors: {
			type: String,
			required: true,
		},
		stock: {
			type: Number,
			required: true,
			default: 0
		},
		shipping: {
			type: Boolean
		}

	})

const Product = mongoose.model('Product', ProductSchema)
export default Product