import Header from "./components/Header";
//import Sidebar from "./components/Sidebar";
import MainPanel from "./components/MainPanel"; // ⬅️ 新增這行

function App() {
  return (
    <div>
      <Header />
      <div style={{ display: "flex" }}>
        <main style={{ padding: "20px", flexGrow: 1 }}>
          <MainPanel /> {/* ⬅️ 改成顯示主畫面元件 */}
        </main>
      </div>
    </div>
  );
}

export default App;
