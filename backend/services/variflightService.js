import axios from "axios";
import { generateToken } from "../utils/tokenUtil.js";

const api = axios.create({
  timeout: 8000,
});

export const callVariFlight = async (queryParams) => {
  const baseParams = {
    appid: process.env.VARIFLIGHT_APPID,
    lang: "en",
    ...queryParams,
  };

  const token = generateToken(baseParams, process.env.VARIFLIGHT_SECRET);

  const finalParams = { ...baseParams, token };

  let attempt = 0;
  const MAX_RETRIES = 3;

  while (attempt < MAX_RETRIES) {
    try {
      const response = await api.get(process.env.VARIFLIGHT_BASE_URL, {
        params: finalParams,
      });

      return response.data;
    } catch (err) {
      attempt++;

      if (attempt === MAX_RETRIES) {
        throw new Error(
          err.response?.data?.error || "VariFlight API failed"
        );
      }
    }
  }
};
