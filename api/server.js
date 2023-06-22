import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import routes from "./routes/index.js";

dotenv.config();

try {
	await mongoose.connect(process.env.DB);
	console.log("MongoDB Connected...");
} catch (error) {
	console.log(error);
}

const app = express();

app.use(cors());
app.use(express.json());

//use routes
app.use('/', routes)

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));
