const LOCAL_URL = "http://localhost:5500";
const GITHUB_BASE_URL = "http://localhost:3000";
export const BASE_URL = process.env.GITHUB_ACTIONS
  ? GITHUB_BASE_URL
  : LOCAL_URL;
