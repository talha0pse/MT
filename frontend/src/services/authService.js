import axios from 'axios';

const API_URL = `${process.env.REACT_APP_API_URL}/api/users/`;

const register = async (userData) => {
  const res = await axios.post(API_URL + 'register', userData);
  return res.data;
};

const login = async (userData) => {
  const res = await axios.post(API_URL + 'login', userData);
  if (res.data.token) {
    localStorage.setItem('user', JSON.stringify(res.data));
  }
  return res.data;
};

const authService = { register, login };
export default authService;
