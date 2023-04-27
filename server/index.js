import patientRoutes from "./routes.js";

import express, { json } from "express";
// const database = require("./infrastructure/connectionDB");

const port = 30000;

try {
	const app = express();
	app.use(json());

	app.use("/", patientRoutes);

	app.listen(port, () => {
		console.log(`Port running on ${port}`);
	});
} catch (error) {
	console.log(error);
}
