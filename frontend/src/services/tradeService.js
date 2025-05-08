import axios from 'axios';

const API_URL = 'https://copy-trading-backend-ksfs.onrender.com/api/trades';

const getToken = () => localStorage.getItem('token');

const getTrades = async () => {
  const res = await axios.get(API_URL, {
    headers: { Authorization: `Bearer ${getToken()}` },
  });
  return res.data;
};

const createTrade = async (tradeData) => {
  await axios.post(API_URL, tradeData, {
    headers: { Authorization: `Bearer ${getToken()}` },
  });
};

const deleteTrade = async (id) => {
  await axios.delete(`${API_URL}/${id}`, {
    headers: { Authorization: `Bearer ${getToken()}` },
  });
};

const tradeService = {
  getTrades,
  createTrade,
  deleteTrade,
};

export default tradeService;
