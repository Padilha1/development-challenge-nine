import {getPatient} from "./controller/patient.js";

import express from "express";

const router = express.Router();

router.get("/", getPatient);

export default router;
