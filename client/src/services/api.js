import axios from "axios";

const api = axios.create({
  baseURL: "https://lld-assessment.onrender.com/api",
});

export default api;
