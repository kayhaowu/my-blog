import { NextResponse } from 'next/server';
import https from 'https';

const FMP_API_KEY = process.env.FMP_API_KEY;
const ALPHA_VANTAGE_API_KEY = process.env.ALPHA_VANTAGE_API_KEY;

async function fetchUSStock(symbol: string) {
  const API_KEY = process.env.FMP_API_KEY;
  const response = await fetch(`https://financialmodelingprep.com/api/v3/historical-price-full/${symbol}?serietype=line&apikey=${API_KEY}`);
  
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  
  const data = await response.json();
  
  if (!data.historical || data.historical.length === 0) {
    throw new Error('No data available for this stock');
  }
  
  const currentYear = new Date().getFullYear();
  const financialData = data.historical
    .filter(item => new Date(item.date).getFullYear() >= currentYear - 5)
    .reduce((acc, item) => {
      const year = new Date(item.date).getFullYear();
      if (!acc.some(d => d.date === year.toString())) {
        acc.push({
          date: year.toString(),
          volume: parseInt(item.volume),
          price: parseFloat(item.close),
          marketCap: parseFloat(item.close) * parseInt(item.volume) // 簡單估算，實際市值可能需要其他API
        });
      }
      return acc;
    }, [])
    .sort((a, b) => parseInt(b.date) - parseInt(a.date))
    .slice(0, 5);

  console.log('Processed financial data:', financialData); // 添加這行來檢查處理後的數據

  return { financialData };
}

async function fetchTWStock(symbol: string) {
  const response = await fetch(`https://query1.finance.yahoo.com/v8/finance/chart/${symbol}.TW?range=5y&interval=1mo`);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const data = await response.json();
  
  if (data.chart.result && data.chart.result[0]) {
    const result = data.chart.result[0];
    const timestamps = result.timestamp;
    const quotes = result.indicators.quote[0];
    const adjclose = result.indicators.adjclose[0].adjclose;

    const financialData = timestamps.map((timestamp, index) => ({
      date: new Date(timestamp * 1000).getFullYear().toString(),
      volume: quotes.volume[index],
      price: adjclose[index],
      marketCap: quotes.volume[index] * adjclose[index] // 估算市值
    })).reverse().slice(0, 5); // 反轉數組以獲得最近的5年數據

    return { financialData };
  }

  throw new Error('No data available');
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const symbol = searchParams.get('symbol');
  const market = searchParams.get('market');

  if (!symbol || !market) {
    return NextResponse.json({ error: 'Symbol and market are required' }, { status: 400 });
  }

  try {
    let data;
    if (market === 'US') {
      data = await fetchUSStock(symbol);
    } else if (market === 'TW') {
      data = await fetchTWStock(symbol);
    } else {
      return NextResponse.json({ error: 'Invalid market' }, { status: 400 });
    }

    if (!data.financialData || data.financialData.length === 0) {
      return NextResponse.json({ error: 'No financial data available for this symbol' }, { status: 404 });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching stock data:', error);
    return NextResponse.json({ error: `Failed to fetch stock data: ${error.message}` }, { status: 500 });
  }
}