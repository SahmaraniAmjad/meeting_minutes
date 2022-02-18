require("dotenv").config();

const port = process.env.SERVER_PORT || 8081;
export const API = `http://localhost:${port}`;