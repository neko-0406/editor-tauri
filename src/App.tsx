import { useCallback, useState } from "react";
import "./App.css";
import { sideBarItems } from "./components/SideBarItem";
import { SettingProvider } from "./components/setting/SettingProvider";
import { useSplitter } from "./hooks/useSplitter";

function App() {
  const { explorerWidth, handleExplorerMouseDown, handleDraggable } = useSplitter();
  const [selectedSideBarItemId, setSelectedSideBarItemId] = useState<string | null>(null)

  const handleClick = useCallback((id: string) => {
    setSelectedSideBarItemId(id)
  }, [])

  return (
    // 全体
    <SettingProvider>
      <div className="w-full h-full flex flex-row">
        {/* サイドバー */}
        <div className="w-[50px] h-full border-l-1 flex flex-col">
          {/* ファイルツリー、検索などのアイコン用 */}
          <div className="flex flex-col flex-2 items-center first:mt-4">
            {sideBarItems?.map(item => {
              return (
                <button type="button" className="w-[30px] h-[30px] p-" key={item.id} onClick={() => handleClick(item.id)}><item.icon  size={25} /></button>
              )
            })}
          </div>
          {/* 設定関連のアイコン用 */}
          <div className="flex flex-col-reverse flex-1"></div>
        </div>

        {/* エクスプローラーなどを入れる部分 */}
        <div className={"h-full flex flex-col relative border-l-1"} style={{ width: `${explorerWidth}px` }}>
          <div className="w-full h-full">
            {selectedSideBarItemId ? sideBarItems.find(item => item.id === selectedSideBarItemId)?.component: null}
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
