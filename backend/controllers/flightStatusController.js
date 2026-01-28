// import { callVariFlight } from "../services/variflightService.js";

// export const flightStatus = async (req, res) => {
//   try {
//     const {
//       type,
//       fnum,
//       date,
//       dep,
//       arr,
//       depcity,
//       arrcity,
//       airport,
//       status,
//       startAt,
//       endAt,
//       page = 1,
//       perpage = 20,
//     } = req.query;

//     let params = { date };

//     switch (type) {
//       // 1️⃣ Flight Number + Date
//       case "flight":
//         if (!fnum || !date) throw new Error("fnum & date required");
//         params.fnum = fnum;
//         break;

//       // 2️⃣ Airport → Airport
//       case "airport":
//         if (!dep || !arr || !date) throw new Error("dep, arr & date required");
//         params.dep = dep;
//         params.arr = arr;
//         break;

//       // 3️⃣ City → City
//       case "city":
//         if (!depcity || !arrcity || !date)
//           throw new Error("depcity, arrcity & date required");
//         params.depcity = depcity;
//         params.arrcity = arrcity;
//         break;

//       // 4️⃣ Airport Board (DEP / ARR)
//       case "board":
//         if (!airport || !status || !date)
//           throw new Error("airport, status & date required");
//         params.airport = airport;
//         params.status = status;
//         params.page = page;
//         params.perpage = perpage;
//         break;

//       // 5️⃣ Airport + Time Window
//       case "time":
//         if (!airport || !status || !startAt || !endAt || !date)
//           throw new Error("airport, status, startAt, endAt & date required");
//         params.airport = airport;
//         params.status = status;
//         params.startAt = startAt;
//         params.endAt = endAt;
//         params.page = page;
//         params.perpage = perpage;
//         break;

//       default:
//         throw new Error("Invalid query type");
//     }

//     const data = await callVariFlight(params);

//     res.json({
//       success: true,
//       data,
//     });
//   } catch (err) {
//     res.status(400).json({
//       success: false,
//       message: err.message,
//     });
//   }
// };


//-------------------------------

// controllers/flightStatusController.js
import { callVariFlight } from "../services/variflightService.js";

// Comprehensive city to airport code mapping
const cityToAirportMap = {
  // India - Major cities
  'bengaluru': 'BLR',
  'bangalore': 'BLR',
  'mumbai': 'BOM',
  'delhi': 'DEL',
  'new delhi': 'DEL',
  'chennai': 'MAA',
  'kolkata': 'CCU',
  'calcutta': 'CCU',
  'hyderabad': 'HYD',
  'ahmedabad': 'AMD',
  'pune': 'PNQ',
  'goa': 'GOI',
  'kochi': 'COK',
  'kozhikode': 'CCJ',
  'lucknow': 'LKO',
  'jaipur': 'JAI',
  'chandigarh': 'IXC',
  'guwahati': 'GAU',
  'patna': 'PAT',
  'indore': 'IDR',
  'visakhapatnam': 'VTZ',
  'thiruvananthapuram': 'TRV',
  'coimbatore': 'CJB',
  'nagpur': 'NAG',
  'varanasi': 'VNS',
  'madurai': 'IXM',
  'raipur': 'RPR',
  'ranchi': 'IXR',
  'bhopal': 'BHO',
  'amritsar': 'ATQ',
  'mangalore': 'IXE',
  'bhubaneswar': 'BBI',
  'dehradun': 'DED',
  'imphal': 'IMF',
  'srinagar': 'SXR',
  'leh': 'IXL',
  'port blair': 'IXZ',
  'udaipur': 'UDR',
  'vadodara': 'BDQ',
  'aurangabad': 'IXU',
  'surat': 'STV',
  'rajkot': 'RAJ',
  'jammu': 'IXJ',
  'agartala': 'IXA',
  'shillong': 'SHL',

  // UK - Major cities
  'london': 'LHR', // Default to Heathrow
  'london heathrow': 'LHR',
  'london gatwick': 'LGW',
  'london stansted': 'STN',
  'london luton': 'LTN',
  'london city': 'LCY',
  'manchester': 'MAN',
  'birmingham': 'BHX',
  'edinburgh': 'EDI',
  'glasgow': 'GLA',
  'glasgow prestwick': 'PIK',
  'belfast': 'BFS',
  'belfast city': 'BHD',
  'bristol': 'BRS',
  'newcastle': 'NCL',
  'liverpool': 'LPL',
  'east midlands': 'EMA',
  'leeds bradford': 'LBA',
  'aberdeen': 'ABZ',
  'southampton': 'SOU',
  'cardiff': 'CWL',
  'exeter': 'EXT',
  'norwich': 'NWI',
  'humberside': 'HUY',

  // USA - Major cities
  'new york': 'JFK',
  'new york jfk': 'JFK',
  'new york newark': 'EWR',
  'new york laguardia': 'LGA',
  'los angeles': 'LAX',
  'chicago': 'ORD',
  'chicago o hare': 'ORD',
  'chicago midway': 'MDW',
  'dallas': 'DFW',
  'denver': 'DEN',
  'san francisco': 'SFO',
  'seattle': 'SEA',
  'las vegas': 'LAS',
  'atlanta': 'ATL',
  'miami': 'MIA',
  'boston': 'BOS',
  'philadelphia': 'PHL',
  'phoenix': 'PHX',
  'orlando': 'MCO',
  'houston': 'IAH',
  'houston hobby': 'HOU',
  'minneapolis': 'MSP',
  'detroit': 'DTW',
  'salt lake city': 'SLC',
  'san diego': 'SAN',
  'tampa': 'TPA',
  'portland': 'PDX',
  'st louis': 'STL',
  'pittsburgh': 'PIT',
  'nashville': 'BNA',
  'austin': 'AUS',
  'raleigh': 'RDU',
  'kansas city': 'MCI',
  'cleveland': 'CLE',
  'cincinnati': 'CVG',
  'indianapolis': 'IND',
  'milwaukee': 'MKE',
  'columbus': 'CMH',
  'charlotte': 'CLT',
  'fort lauderdale': 'FLL',
  'san jose': 'SJC',
  'oakland': 'OAK',
  'sacramento': 'SMF',
  'honolulu': 'HNL',

  // Canada
  'toronto': 'YYZ',
  'toronto pearson': 'YYZ',
  'toronto billy bishop': 'YTZ',
  'vancouver': 'YVR',
  'montreal': 'YUL',
  'calgary': 'YYC',
  'edmonton': 'YEG',
  'ottawa': 'YOW',
  'winnipeg': 'YWG',
  'halifax': 'YHZ',
  'quebec': 'YQB',

  // Australia
  'sydney': 'SYD',
  'melbourne': 'MEL',
  'brisbane': 'BNE',
  'perth': 'PER',
  'adelaide': 'ADL',
  'gold coast': 'OOL',
  'cairns': 'CNS',
  'darwin': 'DRW',
  'hobart': 'HBA',
  'canberra': 'CBR',

  // Middle East
  'dubai': 'DXB',
  'dubai al maktoum': 'DWC',
  'abu dhabi': 'AUH',
  'doha': 'DOH',
  'riyadh': 'RUH',
  'jeddah': 'JED',
  'muscat': 'MCT',
  'kuwait': 'KWI',
  'manama': 'BAH',
  'dammam': 'DMM',
  'dharamshala': 'DHM',

  // Asia
  'singapore': 'SIN',
  'tokyo': 'HND',
  'tokyo haneda': 'HND',
  'tokyo narita': 'NRT',
  'osaka': 'KIX',
  'osaka kansai': 'KIX',
  'osaka itami': 'ITM',
  'hong kong': 'HKG',
  'bangkok': 'BKK',
  'bangkok suvarnabhumi': 'BKK',
  'bangkok don mueang': 'DMK',
  'seoul': 'ICN',
  'seoul incheon': 'ICN',
  'seoul gimpo': 'GMP',
  'kuala lumpur': 'KUL',
  'kuala lumpur subang': 'SZB',
  'jakarta': 'CGK',
  'jakarta soekarno hatta': 'CGK',
  'jakarta halim': 'HLP',
  'manila': 'MNL',
  'manila ninoy aquino': 'MNL',
  'manila clark': 'CRK',
  'taipei': 'TPE',
  'taipei taoyuan': 'TPE',
  'shanghai': 'PVG',
  'shanghai pudong': 'PVG',
  'shanghai hongqiao': 'SHA',
  'beijing': 'PEK',
  'beijing capital': 'PEK',
  'beijing daxing': 'PKX',
  'guangzhou': 'CAN',
  'shenzhen': 'SZX',
  'chengdu': 'CTU',
  'wuhan': 'WUH',
  'xi an': 'XIY',
  'hangzhou': 'HGH',
  'nairobi': 'NBO',
  'colombo': 'CMB',
  'dhaka': 'DAC',
  'kathmandu': 'KTM',
  'lahore': 'LHE',
  'islamabad': 'ISB',
  'karachi': 'KHI',
  'maldives': 'MLE',
  'male': 'MLE',

  // Europe
  'paris': 'CDG',
  'paris charles de gaulle': 'CDG',
  'paris orly': 'ORY',
  'frankfurt': 'FRA',
  'amsterdam': 'AMS',
  'rome': 'FCO',
  'rome fiumicino': 'FCO',
  'rome ciampino': 'CIA',
  'madrid': 'MAD',
  'barcelona': 'BCN',
  'munich': 'MUC',
  'zurich': 'ZRH',
  'geneva': 'GVA',
  'brussels': 'BRU',
  'vienna': 'VIE',
  'prague': 'PRG',
  'warsaw': 'WAW',
  'budapest': 'BUD',
  'copenhagen': 'CPH',
  'stockholm': 'ARN',
  'oslo': 'OSL',
  'helsinki': 'HEL',
  'dublin': 'DUB',
  'lisbon': 'LIS',
  'athens': 'ATH',
  'istanbul': 'IST',
  'istanbul airport': 'IST',
  'istanbul sabiha gokcen': 'SAW',
  'moscow': 'SVO',
  'moscow sheremetyevo': 'SVO',
  'moscow domodedovo': 'DME',
  'saint petersburg': 'LED',

  // Africa
  'cairo': 'CAI',
  'cape town': 'CPT',
  'johannesburg': 'JNB',
  'casablanca': 'CMN',
  'accra': 'ACC',
  'lagos': 'LOS',
  'addis ababa': 'ADD',
  'dar es salaam': 'DAR',
  'kampala': 'EBB',

  // South America
  'sao paulo': 'GRU',
  'rio de janeiro': 'GIG',
  'buenos aires': 'EZE',
  'buenos aires aeroparque': 'AEP',
  'lima': 'LIM',
  'bogota': 'BOG',
  'santiago': 'SCL',
  'caracas': 'CCS',
  'quito': 'UIO',
  'montevideo': 'MVD',

  // Other major cities
  'mexico city': 'MEX',
  'auckland': 'AKL',
  'wellington': 'WLG',
  'christchurch': 'CHC',
  'kolkata': 'CCU',
  'ahmedabad': 'AMD',
  'kochi': 'COK',
  'lucknow': 'LKO',
  'guwahati': 'GAU',
  'jaipur': 'JAI',
  'chandigarh': 'IXC',
  'goa': 'GOI',
  'pune': 'PNQ',
  'coimbatore': 'CJB',
  'visakhapatnam': 'VTZ',
  'nagpur': 'NAG',
  'indore': 'IDR',
  'patna': 'PAT',
  'kozhikode': 'CCJ',
  'mangalore': 'IXE',
  'raipur': 'RPR',
  'ranchi': 'IXR',
  'jammu': 'IXJ',
  'leh': 'IXL',
  'srinagar': 'SXR',
  'amritsar': 'ATQ',
  'bhopal': 'BHO',
  'aurangabad': 'IXU',
  'vadodara': 'BDQ',
  'dehradun': 'DED',
  'imphal': 'IMF',
  'agartala': 'IXA',
  'port blair': 'IXZ',
  'udaipur': 'UDR',
  'madurai': 'IXM',
  'tiruchirappalli': 'TRZ',
  'vijayawada': 'VGA',
  'rajahmundry': 'RJA',
  'tirupati': 'TIR',
  'hubli': 'HBX',
  'belgaum': 'IXG',
  'jamnagar': 'JGA',
  'kandla': 'IXY',
  'bhavnagar': 'BHU',
  'keshod': 'IXK',
  'porbandar': 'PBD',
  'rajkot': 'RAJ',
  'surat': 'STV',
  'bhavnagar': 'BHU',
  'jalgaon': 'JLG',
  'nanded': 'NDC',
  'sholapur': 'SSE',
  'kolhapur': 'KLH',
  'nasik': 'ISK',
  'ratnagiri': 'RTC',
  'pune': 'PNQ',
  'nagpur': 'NAG',
  'gondia': 'GDB',
  'nagpur': 'NAG',
  'raipur': 'RPR',
  'jabalpur': 'JLR',
  'gwalior': 'GWL',
  'khardaha': 'KHU',
  'bhubaneswar': 'BBI',
  'rourkela': 'RRK',
  'jamshedpur': 'IXW',
  'ranchi': 'IXR',
  'dhanbad': 'DBD',
  'bokaro': 'BKSC',
  'gaya': 'GAY',
  'varanasi': 'VNS',
  'allahabad': 'IXD',
  'gorakhpur': 'GOP',
  'kanpur': 'KNU',
  'lucknow': 'LKO',
  'bareilly': 'BEK',
  'dehradun': 'DED',
  'pantnagar': 'PGH',
  'shimla': 'SLV',
  'kullu': 'KUU',
  'dharamshala': 'DHM',
  'jammu': 'IXJ',
  'srinagar': 'SXR',
  'leh': 'IXL',
  'kargil': 'KGL'
};

// Helper function to get airport code
const getAirportCode = (input) => {
  if (!input) return null;
  
  // If already an airport code (3 letters uppercase), return as-is
  if (/^[A-Z]{3}$/.test(input.toUpperCase())) {
    return input.toUpperCase();
  }
  
  // Try to find in map (case-insensitive, trimmed)
  const normalized = input.toLowerCase().trim();
  
  // Direct match
  if (cityToAirportMap[normalized]) {
    return cityToAirportMap[normalized];
  }
  
  // Try partial match (contains)
  for (const [city, code] of Object.entries(cityToAirportMap)) {
    if (city.includes(normalized) || normalized.includes(city)) {
      return code;
    }
  }
  
  return null;
};

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

    // Validate required parameters
    if (!type) {
      throw new Error("Query type is required");
    }

    if (!date) {
      throw new Error("Date is required for all query types");
    }

    let params = { date };

    switch (type.toLowerCase()) {
      // 1️⃣ Flight Number + Date
      case "flight":
        if (!fnum) throw new Error("Flight number (fnum) is required");
        params.fnum = fnum.toUpperCase();
        break;

      // 2️⃣ Airport → Airport
      case "airport":
        if (!dep) throw new Error("Departure airport (dep) is required");
        if (!arr) throw new Error("Arrival airport (arr) is required");
        params.dep = dep.toUpperCase();
        params.arr = arr.toUpperCase();
        break;

      // 3️⃣ City → City (Updated to convert city names to airport codes)
      case "city":
        if (!depcity) throw new Error("Departure city (depcity) is required");
        if (!arrcity) throw new Error("Arrival city (arrcity) is required");
        
        // Convert city names to airport codes
        const depCode = getAirportCode(depcity);
        const arrCode = getAirportCode(arrcity);
        
        if (!depCode) {
          throw new Error(`Could not find airport code for departure city: "${depcity}". Please use airport code (e.g., BLR, LON) or check city name spelling.`);
        }
        
        if (!arrCode) {
          throw new Error(`Could not find airport code for arrival city: "${arrcity}". Please use airport code (e.g., BLR, LON) or check city name spelling.`);
        }
        
        // Use airport codes for the API call
        params.dep = depCode;
        params.arr = arrCode;
        
        // Also send original city names in response for reference
        params.original_depcity = depcity;
        params.original_arrcity = arrcity;
        break;

      // 4️⃣ Airport Board (DEP / ARR)
      case "board":
        if (!airport) throw new Error("Airport code is required");
        if (!status) throw new Error("Status (DEP or ARR) is required");
        
        const airportCode = getAirportCode(airport) || airport.toUpperCase();
        params.airport = airportCode;
        params.status = status.toUpperCase();
        params.page = parseInt(page);
        params.perpage = parseInt(perpage);
        break;

      // 5️⃣ Airport + Time Window
      case "time":
        if (!airport) throw new Error("Airport code is required");
        if (!status) throw new Error("Status (DEP or ARR) is required");
        if (!startAt) throw new Error("Start time (startAt) is required");
        if (!endAt) throw new Error("End time (endAt) is required");
        
        const airportCodeTime = getAirportCode(airport) || airport.toUpperCase();
        params.airport = airportCodeTime;
        params.status = status.toUpperCase();
        params.startAt = startAt;
        params.endAt = endAt;
        params.page = parseInt(page);
        params.perpage = parseInt(perpage);
        break;

      default:
        throw new Error(`Invalid query type: "${type}". Valid types are: flight, airport, city, board, time`);
    }

    // Additional validation for date format
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(date)) {
      throw new Error("Date must be in YYYY-MM-DD format");
    }

    // Validate date is not in the past
    const requestedDate = new Date(date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    if (requestedDate < today) {
      throw new Error("Date cannot be in the past");
    }

    // Call the VariFlight API
    const data = await callVariFlight(params);

    // Add metadata to response
    const response = {
      success: true,
      query: {
        type,
        ...(type.toLowerCase() === 'city' && {
          original_depcity: depcity,
          original_arrcity: arrcity,
          resolved_departure_code: params.dep,
          resolved_arrival_code: params.arr
        }),
        date,
        timestamp: new Date().toISOString()
      },
      data
    };

    res.json(response);
    
  } catch (err) {
    console.error("Flight status error:", err.message);
    
    res.status(400).json({
      success: false,
      message: err.message,
      timestamp: new Date().toISOString()
    });
  }
};


//=================================================

// 🔥 Flight search controller (mock KAYAK + dynamic)
export const flightPrice = async (req, res) => {
  const { from, to, date } = req.query;

  if (!from || !to || !date) {
    return res.status(400).json({
      success: false,
      message: "from, to and date are required",
    });
  }

  // Mock dynamic price logic
  const basePrice = 200;
  const randomExtra = Math.floor(Math.random() * 100);

  return res.status(200).json({
    success: true,
    provider: "KAYAK (mock)",
    search: {
      from,
      to,
      date,
    },
    result: {
      airline: "Emirates",
      flightNumber: "EK-202",
      duration: "3h 45m",
      price: basePrice + randomExtra,
      currency: "USD",
      cabinClass: "Economy",
    },
  });
};

// 🔥 (Optional) Real KAYAK API function (kept for future)
export const searchFlightsFromKayak = async () => {
  try {
    const response = await axios.get(
      "https://sandbox.api.kayak.com/your-endpoint",
      {
        headers: {
          Authorization: `Bearer ${process.env.KAYAK_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("KAYAK API Error:", error.message);
    return null;
  }
};



