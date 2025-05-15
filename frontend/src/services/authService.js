import axios from 'axios';

const API_URL = 'https://copy-trading-backend-ksfs.onrender.com/api/auth';

const register = async (userData) => {
  const res = await axios.post(`${API_URL}/register`, userData);
  localStorage.setItem('token', res.data.token);
};

const login = async (userData) => {
  const res = await axios.post(`${API_URL}/login`, userData);
  localStorage.setItem('token', res.data.token);
};

const authService = {
  register,
  login,
};

export default authService;
