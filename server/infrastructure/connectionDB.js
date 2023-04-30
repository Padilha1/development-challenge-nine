import mysql from "mysql";
import * as dotenv from "dotenv";
dotenv.config();

const password = process.env.DATABASE_PSW;
const user = process.env.DATABASE_USER;
const host = process.env.DATABASE_HOST;

export const database = mysql.createConnection({
	host: host,
	port: "3306",
	user: user,
	password: password,
	database: "medcloud",
});

database.connect((err) => {
	if (err) {
		console.log(err.message);
		return;
	}
	console.log("Database connected!");
});
