import axios from "axios";

const BASE_URL = "http://localhost:3001/persons";

const getAll = async () => {
  const request = await axios.get(BASE_URL);
  return request.data;
};

const create = async (newObject) => {
  const response = await axios.post(BASE_URL, newObject);
  return response.data;
};

const deletePerson = async (id) => {
  const response = await axios.delete(`${BASE_URL}/${id}`);
  return response.data;
};

const update = async (id, data) => {
  const response = await axios.put(`${BASE_URL}/${id}`, data);
  return response.data;
};

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  create,
  getAll,
  delete: deletePerson,
  update,
};
