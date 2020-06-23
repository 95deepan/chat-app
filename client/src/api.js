import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:8000/chat",
});

export const getUsers = async () => {
  return await instance.get("/get/users");
};
