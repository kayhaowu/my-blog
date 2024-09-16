'use client';

import { useState } from 'react';
import StockChart from './StockChart';

type Market = 'US' | 'TW';

export default function StockDashboard() {
  const [symbol, setSymbol] = useState('');
  const [market, setMarket] = useState<Market>('US');
  const [stockData, setStockData] = useState(null);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isInputFocused, setIsInputFocused] = useState(false);

  const handleSearch = async () => {
    setError('');
    setStockData(null);
    setIsLoading(true);
    try {
      const response = await fetch(`/api/stock?symbol=${symbol}&market=${market}`);
      const data = await response.json();
      if (response.ok) {
        setStockData(data);
      } else {
        setError(data.error || 'An error occurred while fetching data');
      }
    } catch (err) {
      setError('Failed to fetch stock data: ' + (err.message || 'Unknown error'));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-8">Stock Dashboard</h1>
      <div className="flex flex-col items-center space-y-4 mb-8">
        <div className="w-full max-w-md">
          <select
            value={market}
            onChange={(e) => setMarket(e.target.value as Market)}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
          >
            <option value="US">US Stock</option>
            <option value="TW">Taiwan Stock</option>
          </select>
        </div>
        <div className="w-full max-w-md">
          <input
            type="text"
            placeholder={market === 'US' ? "Enter US stock symbol (e.g., AAPL)" : "Enter Taiwan stock code (e.g., 2330)"}
            value={symbol}
            onChange={(e) => setSymbol(e.target.value)}
            onFocus={() => setIsInputFocused(true)}
            onBlur={() => setIsInputFocused(false)}
            className={`w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 ${isInputFocused ? 'ring-2 ring-blue-500 scale-105' : ''}`}
          />
        </div>
        <button 
          onClick={handleSearch}
          disabled={isLoading}
          className={`w-full max-w-md bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-all duration-300 ${isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105'}`}
        >
          {isLoading ? 'Searching...' : 'Search'}
        </button>
      </div>
      {error && <div className="text-red-500 text-center mb-4">{error}</div>}
      {stockData && (
        <div className="bg-white shadow-lg rounded-lg p-6 transition-all duration-300 hover:scale-105">
          <StockChart data={stockData} market={market} />
        </div>
      )}
    </div>
  );
}