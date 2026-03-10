import axios from "axios";

const publicApi = axios.create({
  baseURL: "https://dummyjson.com",
  headers: {
    "Content-Type": "application/json",
  },
});

export default publicApi;