import React, { useEffect, useState } from 'react';
import axios from '../api';
import { useNavigate } from 'react-router-dom';

function DashboardPage() {
  const [trades, setTrades] = useState([]);
  const [formData, setFormData] = useState({ symbol: '', action: 'buy', price: '' });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchTrades();
  }, []);

  const fetchTrades = async () => {
    try {
      const res = await axios.get('/trades');
      setTrades(res.data);
    } catch (err) {
      console.error('Failed to fetch trades:', err);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post('/trades', formData);
      setFormData({ symbol: '', action: 'buy', price: '' });
      fetchTrades();
    } catch (err) {
      console.error('Failed to add trade:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/trades/${id}`);
      fetchTrades();
    } catch (err) {
      console.error('Failed to delete trade:', err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="dashboard-container">
      <h2>Dashboard</h2>
      <button onClick={handleLogout}>Logout</button>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="symbol"
          placeholder="Symbol (e.g., GOLD)"
          value={formData.symbol}
          onChange={handleChange}
          required
        />
        <select name="action" value={formData.action} onChange={handleChange}>
          <option value="buy">Buy</option>
          <option value="sell">Sell</option>
        </select>
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Adding...' : 'Add Trade'}
        </button>
      </form>

      <ul className="trade-list">
        {trades.map((trade) => (
          <li key={trade._id}>
            {trade.symbol} - {trade.action} at {trade.price}
            <button onClick={() => handleDelete(trade._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default DashboardPage;
