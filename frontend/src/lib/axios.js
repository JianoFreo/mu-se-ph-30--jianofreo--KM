import axios from "axios";

// Single shared axios instance — use this rather than raw axios/fetch
// elsewhere in the app, matching the convention this codebase follows.
export const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "/api",
});
