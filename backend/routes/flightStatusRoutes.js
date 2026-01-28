import express from "express";
import { flightStatus ,flightPrice} from "../controllers/flightStatusController.js";

const router = express.Router();

router.get("/flight-status", flightStatus);

router.get("/flight-price", flightPrice);



export default router;




/*
https://learn-step-farebuzzertravel-backend.skxdwz.easypanel.host/api/flight-status?type=flight&fnum=AI101&date=2026-01-09

https://learn-step-farebuzzertravel-backend.skxdwz.easypanel.host/api/flight-status?type=airport&dep=DEL&arr=DXB&date=2026-01-09

https://learn-step-farebuzzertravel-backend.skxdwz.easypanel.host/api/flight-status?type=board&airport=DEL&status=DEP&date=2026-01-09

========================

1️⃣ Flight Number + Date

Use when you know exact flight number

https://learn-step-farebuzzertravel-backend.skxdwz.easypanel.host/api/flight-status
?type=flight
&fnum=EK513
&date=2026-01-09

2️⃣ Airport → Airport (MOST COMMON)

Departure airport → Arrival airport

https://learn-step-farebuzzertravel-backend.skxdwz.easypanel.host/api/flight-status
?type=airport
&dep=DEL
&arr=DXB
&date=2026-01-09


✔️ You already tested this — works perfectly

3️⃣ City → City

When airport code is not known

https://learn-step-farebuzzertravel-backend.skxdwz.easypanel.host/api/flight-status
?type=city
&depcity=Delhi
&arrcity=Dubai
&date=2026-01-09

4️⃣ Airport Board (Departure / Arrival Board)

Live airport board style data

➤ Departure Board
https://learn-step-farebuzzertravel-backend.skxdwz.easypanel.host/api/flight-status
?type=board
&airport=DEL
&status=dep
&date=2026-01-09
&page=1
&perpage=20

➤ Arrival Board
https://learn-step-farebuzzertravel-backend.skxdwz.easypanel.host/api/flight-status
?type=board
&airport=DXB
&status=arr
&date=2026-01-09
&page=1
&perpage=20

5️⃣ Airport + Time Window

Flights within specific time range

https://learn-step-farebuzzertravel-backend.skxdwz.easypanel.host/api/flight-status
?type=time
&airport=DEL
&status=dep
&date=2026-01-09
&startAt=06:00
&endAt=12:00
&page=1
&perpage=20

✅ Expected Successful Response Format
{
  "success": true,
  "data": [ ... live flight objects ... ]
}

❌ Error Example (if params missing)
{
  "success": false,
  "message": "dep, arr & date required"
}
  =========================================================================================



  1. By Flight Number (type=flight) — Most common for tracking one specific flight

https://learn-step-farebuzzertravel-backend.skxdwz.easypanel.host/api/flight-status?type=flight&fnum=AI101&date=2026-01-20
https://learn-step-farebuzzertravel-backend.skxdwz.easypanel.host/api/flight-status?type=flight&fnum=6E2341&date=2026-01-16
https://learn-step-farebuzzertravel-backend.skxdwz.easypanel.host/api/flight-status?type=flight&fnum=UK827&date=2026-02-15


Required: type=flight, fnum, date
Recommended format for date: YYYY-MM-DD


2. Between Two Airports (type=airport)


https://learn-step-farebuzzertravel-backend.skxdwz.easypanel.host/api/flight-status?type=airport&dep=DEL&arr=DXB&date=2026-01-20
https://learn-step-farebuzzertravel-backend.skxdwz.easypanel.host/api/flight-status?type=airport&dep=BOM&arr=BKK&date=2026-01-18
https://learn-step-farebuzzertravel-backend.skxdwz.easypanel.host/api/flight-status?type=airport&dep=BLR&arr=DXB&date=2026-02-16

Required: type=airport, dep (departure IATA), arr (arrival IATA), date

3. Between Two Cities (type=city) — Useful when you want all airports of the city pair

https://learn-step-farebuzzertravel-backend.skxdwz.easypanel.host/api/flight-status?type=city&depcity=Delhi&arrcity=Dubai&date=2026-01-20
https://learn-step-farebuzzertravel-backend.skxdwz.easypanel.host/api/flight-status?type=city&depcity=Mumbai&arrcity=Bangkok&date=2026-01-19
https://learn-step-farebuzzertravel-backend.skxdwz.easypanel.host/api/flight-status?type=city&depcity=Bengaluru&arrcity=London&date=2026-01-22

Required: type=city, depcity, arrcity, date
(City names should be in English — how VariFlight expects them)

4. Full Airport Board — Departures or Arrivals (type=board)

https://learn-step-farebuzzertravel-backend.skxdwz.easypanel.host/api/flight-status?type=board&airport=DEL&status=departure&date=2026-02-20
https://learn-step-farebuzzertravel-backend.skxdwz.easypanel.host/api/flight-status?type=board&airport=BOM&status=arrival&date=2026-02-16&page=1&perpage=30
https://learn-step-farebuzzertravel-backend.skxdwz.easypanel.host/api/flight-status?type=board&airport=DXB&status=departure&date=2026-02-20&page=2&perpage=20

Required: type=board, airport (IATA code), status (usually departure or arrival), date
Optional: page (default 1), perpage (default 20, try 30–50)

5. Airport Board in Specific Time Window (type=time) — Best for "flights in next 3 hours" type features

https://learn-step-farebuzzertravel-backend.skxdwz.easypanel.host/api/flight-status?type=time&airport=DEL&status=departure&date=2026-01-20&startAt=0600&endAt=1200
https://learn-step-farebuzzertravel-backend.skxdwz.easypanel.host/api/flight-status?type=time&airport=BLR&status=arrival&date=2026-01-20&startAt=0900&endAt=1800&page=1&perpage=25
https://learn-step-farebuzzertravel-backend.skxdwz.easypanel.host/api/flight-status?type=time&airport=DXB&status=departure&date=2026-01-20&startAt=0000&endAt=2359

Required: type=time, airport, status, date, startAt, endAt

*/