import axios from "axios";

const BASE_URL = "http://localhost:3001/persons";

export const create = async (newObject) => {
  const response = await axios.post(BASE_URL, newObject);
  return response.data;
};

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  create,
};
