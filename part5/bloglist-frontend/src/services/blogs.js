import axios from 'axios';

const baseUrl = '/api/blogs';

let token = null;

const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const setupConfig = () => {
  const config = {
    headers: {
      Authorization: token,
    },
  };

  return config;
};

const incrementLike = async (blog) => {
  const response = await axios.put(
    `${baseUrl}/${blog.id}`,
    { ...blog, likes: blog.likes + 1 },
    setupConfig()
  );
  return response.data;
};

const removeBlog = async (id) => {
  const response = await axios.delete(`${baseUrl}/${id}`, setupConfig());
  return response;
};

const create = async (newBlog) => {
  const response = await axios.post(baseUrl, newBlog, setupConfig());
  return response.data;
};


export default { getAll, create, setToken, incrementLike, removeBlog };
