import "./App.css";
import { Explorer } from "./components/explorer/Explorer";
import { SettingProvider } from "./components/setting/SettingProvider";
import { useSplitter } from "./hooks/useSplitter";

function App() {
  const { explorerWidth, handleExplorerMouseDown, handleDraggable } = useSplitter();

  return (
    // 全体
    <SettingProvider>
      <div className="w-full h-full flex flex-row">
        {/* サイドバー */}
        <div className="w-[40px] h-full border-l-1 flex flex-col">
          {/* ファイルツリー、検索などのアイコン用 */}
          <div className="flex flex-col flex-2"></div>
          {/* 設定関連のアイコン用 */}
          <div className="flex flex-col-reverse flex-1"></div>
        </div>

        {/* エクスプローラーなどを入れる部分 */}
        <div className={"h-full flex flex-col relative border-l-1"} style={{ width: `${explorerWidth}px` }}>
          <div className="w-full h-full">
            <Explorer />
          </div>
          {/* splitter */}
          <div
            className="h-full absolute right-0 w-[5px] hover:bg-blue-300 hover:cursor-col-resize"
            onMouseDown={handleExplorerMouseDown}
            onDrag={handleDraggable}
          />
        </div>

        {/* エディター（タブ） */}
        <div className="flex-1 h-full border-l-1"></div>
      </div>
    </SettingProvider>
  );
}

export default App;
