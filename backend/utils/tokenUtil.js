import crypto from "crypto";

export const generateToken = (params, secret) => {
  const sortedStr = Object.keys(params)
    .sort()
    .map(key => `${key}=${params[key]}`)
    .join("&");

  const first = crypto.createHash("md5").update(sortedStr + secret).digest("hex");
  return crypto.createHash("md5").update(first).digest("hex");
};
