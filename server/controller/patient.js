import { database } from "../infrastructure/connectionDB.js";

export const getPatient = (_, res) => {
	const q = `SELECT * FROM patient`;

	database.query(q, (err, data) => {
		if (err) return res.json(err);

		return res.status(200).json(data);
	});
};
