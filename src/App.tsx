import { useState } from "react";
import "./App.css";

function App() {
  const [explorerWidth, setExplorerWidth] = useState<number>(300)

  return (
    // 全体
    <div className="w-full h-full flex flex-row">
      {/* サイドバー */}
      <div className="w-[40px] h-full border-l-1"></div>

      {/* エクスプローラー */}
      <div className={"h-full border-l-1"} style={{width: `${explorerWidth}px`}}></div>

      {/* エディター（タブ） */}
      <div className="flex-1 h-full border-l-1"></div>
    </div>
  )
}

export default App;
