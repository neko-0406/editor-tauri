import "./App.css";
import { useSplitter } from "./hooks/useSplitter";

function App() {
  const { explorerWidth, handleExplorerMouseDown, handleDragable } = useSplitter();

  return (
    // 全体
    <div className="w-full h-full flex flex-row">
      {/* サイドバー */}
      <div className="w-[40px] h-full border-l-1"></div>

      {/* エクスプローラーなどを入れる部分 */}
      <div className={"h-full relative border-l-1"} style={{ width: `${explorerWidth}px` }}>
        {/* splitter */}
        <div
          className="h-full absolute right-0 w-[5px] hover:bg-blue-300"
          onMouseDown={handleExplorerMouseDown}
          onDrag={handleDragable}
        />
      </div>

      {/* エディター（タブ） */}
      <div className="flex-1 h-full border-l-1"></div>
    </div>
  );
}

export default App;
