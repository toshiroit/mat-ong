import axios from "axios";

export const requestServices = axios.create({
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  },
  baseURL: "https://mat-ong.vercel.app/api",
  method: "POST",
});
