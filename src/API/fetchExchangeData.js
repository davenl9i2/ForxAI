import axios from "axios";

const API_KEY = "d9841d99d58749e19cff1521712c22f7";
const BASE_URL = "https://api.twelvedata.com/time_series";

export async function fetchExchangeData(symbol = "USD/JPY", interval = "1day", outputsize = 100) {
  const cacheKey = `${symbol}_${interval}`;
  const cached = localStorage.getItem(cacheKey);
  if (cached) {
    const parsed = JSON.parse(cached);
    const now = Date.now();
    if (now - parsed.timestamp < 1000 * 60 * 10) {
      console.log("使用 localStorage 快取資料：", parsed);
      return parsed.data;
    }
  }

  try {
    const response = await axios.get(BASE_URL, {
      params: {
        symbol,
        interval,
        outputsize,
        apikey: API_KEY,
      },
    });

    if (response.data.status === "error") {
      console.error("API 錯誤：", response.data.message);
      return null;
    }

    const values = response.data.values?.reverse() || [];

    const candlestick = values.map((item) => ({
      x: item.datetime,
      o: parseFloat(item.open),
      h: parseFloat(item.high),
      l: parseFloat(item.low),
      c: parseFloat(item.close),
    }));

    const line = values.map((item) => ({
      x: item.datetime,
      y: parseFloat(item.close),
    }));

    const lastUpdated = values.at(-1)?.datetime || new Date().toISOString();
    const result = {
      candlestick,
      line,
      lastUpdated,
      prediction: {
        value: (line.at(-1)?.y ?? 0) + 0.05,
        range: "3d",
        confidence: "87%",
        summary: [
          { title: "美元升息機率高", snippet: "市場預期聯準會將再次升息，美元可能走強。" },
          { title: "日本CPI成長放緩", snippet: "日本通膨數據放緩，市場對日元信心降低。" },
        ]
      }
    };

    localStorage.setItem(cacheKey, JSON.stringify({ timestamp: Date.now(), data: result }));

    return result;
  } catch (err) {
    console.error("資料抓取失敗：", err);
    return null;
  }
}
