import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:8000/chat",
});

export const getUsers = async () => {
  return await instance.get("/get/users");
};

export const getMyRooms = async (userId) => {
  return await instance.get("/get/rooms/" + userId);
};

export const getMessages = async () => {
  let response = await instance.get("/get/messages");

  if (response.status == 502) {
    await getMessages();
  } else if (response.status != 200) {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    await getMessages();
  } else {
    let message = await response.text();
    await getMessages();
  }
};
