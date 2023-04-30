import { database } from "../infrastructure/connectionDB.js";

export const getPatient = (_, res) => {
	const q = `SELECT * FROM patient`;

	database.query(q, (err, data) => {
		if (err) return res.json(err);

		return res.status(200).json(data);
	});
};

export const addPatient = (req, res) => {
	const q = "INSERT INTO patient(name, email, address, birthdate) VALUES (?)";

	const values = [
		req.body.name,
		req.body.email,
		req.body.address,
		req.body.birthdate,
	];

	database.query(q, [values], (err) => {
		if (err) return res.json(err);

		return res.status(200).json("Patient created successfully");
	});
};

export const updatePatient = (req, res) => {
	const q =
		"UPDATE patient SET name = ?, email = ?, address = ?, birthdate = ? WHERE id = ?";

	const values = [
		req.body.name,
		req.body.email,
		req.body.address,
		req.body.birthdate,
	];

	database.query(q, [...values, req.params.id], (err) => {
		if (err) return res.json(err);

		return res.status(200).json("Patient updated successfully.");
	});
};

export const deletePatient = (req, res) => {
	const q = "DELETE FROM patient WHERE id = ?";

	database.query(q, [req.params.id], (err) => {
		if (err) return res.json(err);

		return res.status(200).json("Patient deleted successfully.");
	});
};
