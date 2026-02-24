import axios from "axios";

const API = axios.create({
  baseURL: "http://127.0.0.1:8000",
});

export const createSession = async () => {
  const res = await API.post("/session");
  return res.data;
};

export const sendMessage = async (session_id: number, message: string) => {
  const res = await API.post("/chat", {
    session_id,
    message,
  });
  return res.data;
};