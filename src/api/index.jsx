import axios from "axios";
import OAuth from "oauth-1.0a";
import CryptoJS from "crypto-js";

export const getHeadersWithAuth = () => {
  return {
    "Content-Type": "application/json",
    Accept: "application/json",
  };
};

const consumer_key = import.meta.env.VITE_WC_CONSUMER_KEY;
const consumer_secret = import.meta.env.VITE_WC_CONSUMER_SECRET;
export const siteURL = import.meta.env.VITE_PUBLIC_SITE_URL;
export const siteUploadFolder = siteURL + "wp-content/uploads/";
export const baseURL = import.meta.env.VITE_PUBLIC_BASE_URL;

export const oauth = OAuth({
  consumer: {
    key: consumer_key,
    secret: consumer_secret,
  },
  signature_method: "HMAC-SHA1",
  hash_function: function (base_string, key) {
    return CryptoJS.enc.Base64.stringify(CryptoJS.HmacSHA1(base_string, key));
  },
});

export const axiosClient = axios.create({
  headers: getHeadersWithAuth(),
});

export default axiosClient;
