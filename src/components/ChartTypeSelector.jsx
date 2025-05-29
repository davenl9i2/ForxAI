export default function ChartTypeSelector({ chartType, onChange }) {
  return (
    <div style={{ marginBottom:  "20px"}}>
      <label style={{ marginRight: "10px", fontWeight: "bold" }}>圖表類型：</label>
      <select
        value={chartType}
        onChange={(e) => onChange(e.target.value)}
        style={{ padding: "6px 10px", borderRadius: "4px" }}
      >
        <option value="line">折線圖</option>
        <option value="candlestick">K 線圖</option>
      </select>
    </div>
  );
}
