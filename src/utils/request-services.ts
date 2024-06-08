import axios from "axios";

export const requestServices = axios.create({
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  },
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
  method: "POST",
});
