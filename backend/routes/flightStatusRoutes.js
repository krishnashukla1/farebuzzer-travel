import express from "express";
import { flightStatus } from "../controllers/flightStatusController.js";

const router = express.Router();

router.get("/flight-status", flightStatus);

export default router;




/*
http://localhost:80/api/flight-status?type=flight&fnum=AI101&date=2026-01-09

http://localhost:80/api/flight-status?type=airport&dep=DEL&arr=DXB&date=2026-01-09

http://localhost:80/api/flight-status?type=board&airport=DEL&status=DEP&date=2026-01-09

*/