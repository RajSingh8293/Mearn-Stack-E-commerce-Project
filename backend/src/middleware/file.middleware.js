import multer from "multer"
// import path from "path"

const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, "./public")
	},
	filename: function (req, file, cb) {

		// cb(null, file.originalname)
		cb(null, `${Date.now()}_${file.originalname}`)
	}
})

export const upload = multer({
	storage,
	limits: { fileSize: 1024 * 1024 * 2 }
})



// const multer = require("multer");
// const path = require("path");


// const storage = multer.diskStorage({
// 	destination: (req, file, cb) => cb(null, "./public"), // cb -> callback
// 	filename: (req, file, cb) => {
// 		const uniqueName = `${Date.now()}-${Math.round(
// 			Math.random() * 1e9
// 		)}${path.extname(file.originalname)}`;
// 		cb(null, uniqueName);
// 	},
// });

// export const upload = multer({
// 	storage,

// })