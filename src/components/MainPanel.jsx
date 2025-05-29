import { useEffect, useState, useRef } from "react";
import { fetchExchangeData } from "../API/fetchExchangeData";
import LineChart from "./LineChart";
import CandleChart from "./CandleChart";

const buttonStyle = (active) => ({
  margin: "4px",
  padding: "6px 12px",
  border: "1px solid #ccc",
  borderRadius: "4px",
  backgroundColor: active ? "#0d6efd" : "#f8f9fa",
  color: active ? "white" : "black",
  fontWeight: active ? "bold" : "normal",
  cursor: "pointer",
});

export default function MainPanel() {
  const [selectedPair, setSelectedPair] = useState("USD/JPY");
  const [selectedTimeFrame, setSelectedTimeFrame] = useState("1day");
  const [chartType, setChartType] = useState("line");
  const [sharedData, setSharedData] = useState({ candlestick: [], line: [], lastUpdated: null });
  const cache = useRef({});

  useEffect(() => {
    async function fetchData() {
      const cacheKey = `${selectedPair}_${selectedTimeFrame}`;

      if (cache.current[cacheKey]) {
        console.log("使用快取資料：", cache.current[cacheKey]);
        setSharedData(cache.current[cacheKey]);
        return;
      }

      const result = await fetchExchangeData(selectedPair, selectedTimeFrame, 100);
      console.log("取得的資料：", result);
      if (result) {
        cache.current[cacheKey] = result;
        setSharedData(result);
      }
    }
    fetchData();
  }, [selectedPair, selectedTimeFrame]);

  return (
    <div style={{ padding: "20px" }}>
      <div style={{ marginBottom: "10px" }}>
        {["USD/JPY", "EUR/USD", "GBP/USD"].map((pair) => (
          <button
            key={pair}
            style={buttonStyle(selectedPair === pair)}
            onClick={() => setSelectedPair(pair)}>
            {pair}
          </button>
        ))}
        <br />
        {["1h", "4h", "1day", "1week", "1month"].map((frame) => (
          <button
            key={frame}
            style={buttonStyle(selectedTimeFrame === frame)}
            onClick={() => setSelectedTimeFrame(frame)}>
            {frame.toUpperCase()}
          </button>
        ))}
        <br />
        圖表類型：
        <select value={chartType} onChange={(e) => setChartType(e.target.value)}>
          <option value="line">折線圖</option>
          <option value="candlestick">K 線圖</option>
        </select>
      </div>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h2>{selectedPair} - {selectedTimeFrame} 匯率走勢圖</h2>
        {sharedData.lastUpdated && (
          <div style={{ fontSize: "0.9rem", color: "#555" }}>
            最後更新：{new Date(sharedData.lastUpdated).toLocaleString()}
          </div>
        )}
      </div>

      {chartType === "line" ? (
        <LineChart data={sharedData.line || []} />
      ) : (
        <CandleChart data={sharedData.candlestick || []} />
      )}

      {/* ✅ 預測結果區塊 */}
      <div style={{ marginTop: "20px", borderTop: "1px solid #ccc", paddingTop: "10px" }}>
        <h3>📈 匯率預測與新聞解讀</h3>
        <form>
          <label>
            預測值：
            <input type="number" step="0.01" placeholder="輸入目標匯率" style={{ marginRight: "10px" }} />
          </label>
          <label>
            預測區間：
            <select defaultValue="3d">
              <option value="1d">1 天</option>
              <option value="3d">3 天</option>
              <option value="1w">1 週</option>
              <option value="1m">1 個月</option>
            </select>
          </label>
          <button type="submit" style={{ marginLeft: "10px" }}>提交預測</button>
        </form>

        <div style={{ marginTop: "12px", fontSize: "0.95rem" }}>
          <p>
            🔮 預測結果：<strong>{sharedData.prediction?.value?.toFixed(3)}</strong>
            （區間：{sharedData.prediction?.range}）
          </p>
          <p>信心度：<strong>{sharedData.prediction?.confidence}</strong></p>
          <ul>
            {sharedData.prediction?.summary?.map((item, idx) => (
              <li key={idx}>📰 <strong>{item.title}</strong>：{item.snippet}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
