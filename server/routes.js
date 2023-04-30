import {
	getPatient,
	addPatient,
	updatePatient,
	deletePatient,
} from "./controller/patient.js";

import express from "express";

const router = express.Router();

router.get("/", getPatient);

router.post("/", addPatient);

router.put("/:id", updatePatient);

router.delete("/:id", deletePatient);

export default router;
