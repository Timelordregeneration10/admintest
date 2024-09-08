import axios from "axios";
// Set config defaults when creating the instance
const instance = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_HOST}`,
  timeout: 1000 * 30,
});

// Alter defaults after instance has been created
instance.defaults.headers.post["Content-Type"] = "application/json";

export default instance;
