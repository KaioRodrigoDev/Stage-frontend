import axios from "axios";

const API_SERVICE = axios.create({
  httpsAgent: { rejectUnauthorized: false },
  baseURL:
    process.env.NEXT_PUBLIC_PROD === "true"
      ? process.env.NEXT_PUBLIC_API_PROD_BASE_URL
      : process.env.NEXT_PUBLIC_API_DEVELOP_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  timeout: 3000,
});

API_SERVICE.interceptors.request.use(async (config) => {
  const LOCAL_ACCESS_TOKEN = localStorage.getItem("authBearerToken");

  if (LOCAL_ACCESS_TOKEN) {
    config.headers.Authorization = `Bearer ${LOCAL_ACCESS_TOKEN}`;
  }

  return config;
});

export default API_SERVICE;
