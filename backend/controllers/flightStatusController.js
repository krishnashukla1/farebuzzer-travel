import { callVariFlight } from "../services/variflightService.js";

export const flightStatus = async (req, res) => {
  try {
    const {
      type,
      fnum,
      date,
      dep,
      arr,
      depcity,
      arrcity,
      airport,
      status,
      startAt,
      endAt,
      page = 1,
      perpage = 20,
    } = req.query;

    let params = { date };

    switch (type) {
      // 1️⃣ Flight Number + Date
      case "flight":
        if (!fnum || !date) throw new Error("fnum & date required");
        params.fnum = fnum;
        break;

      // 2️⃣ Airport → Airport
      case "airport":
        if (!dep || !arr || !date) throw new Error("dep, arr & date required");
        params.dep = dep;
        params.arr = arr;
        break;

      // 3️⃣ City → City
      case "city":
        if (!depcity || !arrcity || !date)
          throw new Error("depcity, arrcity & date required");
        params.depcity = depcity;
        params.arrcity = arrcity;
        break;

      // 4️⃣ Airport Board (DEP / ARR)
      case "board":
        if (!airport || !status || !date)
          throw new Error("airport, status & date required");
        params.airport = airport;
        params.status = status;
        params.page = page;
        params.perpage = perpage;
        break;

      // 5️⃣ Airport + Time Window
      case "time":
        if (!airport || !status || !startAt || !endAt || !date)
          throw new Error("airport, status, startAt, endAt & date required");
        params.airport = airport;
        params.status = status;
        params.startAt = startAt;
        params.endAt = endAt;
        params.page = page;
        params.perpage = perpage;
        break;

      default:
        throw new Error("Invalid query type");
    }

    const data = await callVariFlight(params);

    res.json({
      success: true,
      data,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};
