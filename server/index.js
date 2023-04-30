import patientRoutes from "./routes.js";

import express, { json } from "express";
import cors from "cors";
// const database = require("./infrastructure/connectionDB");

const port = 30000;

try {
	const app = express();
	app.use(json());
	app.use(cors());

	app.use("/", patientRoutes);

	app.listen(port, () => {
		console.log(`Port running on ${port}`);
	});
} catch (error) {
	console.log(error);
}
