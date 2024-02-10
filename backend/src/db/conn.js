import mongoose from 'mongoose'
import 'dotenv/config' // we used in index.js file


const connectDb = async () => {

	try {
		const connected = await mongoose
			.connect(`${process.env.MONGODB_URL}`)
		console.log("Server connected : ", connected.connection.host);

	} catch (error) {
		console.log(error)
		process.exit(1)

	}
}

export default connectDb