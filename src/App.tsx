import "./App.css";

import { useCallback, useState } from "react";
import { FaGear } from "react-icons/fa6";

import { Setting } from "./components/setting/Setting";
import { SettingProvider } from "./components/setting/SettingProvider";
import { sideBarItems } from "./components/SideBarItem";
import { TabContainer } from "./components/tab/EditorTab";
import { useDialogDisplay } from "./hooks/useDialogDisplay";
import { useSplitter } from "./hooks/useSplitter";

function App() {
  const { explorerWidth, handleExplorerMouseDown, handleDraggable } = useSplitter();
  const { isDialogOpen, setIsDialogOpen, openDialog } = useDialogDisplay();
  const [selectedSideBarItemId, setSelectedSideBarItemId] = useState<string | null>(null);

  const handleClick = useCallback((id: string) => {
    setSelectedSideBarItemId(id);
  }, []);

  return (
    // 全体
    <SettingProvider>
      <div className="relative flex h-full w-full flex-row">
        {isDialogOpen ? <Setting isDialogOpen={isDialogOpen} setIsDialogOpen={setIsDialogOpen} /> : null}
        {/* サイドバー */}
        <div className="flex h-full w-[50px] flex-col border-l-1">
          {/* ファイルツリー、検索などのアイコン用 */}
          <div className="flex flex-2 flex-col items-center first:mt-4">
            {sideBarItems?.map((item) => {
              return (
                <button type="button" className="h-[30px] w-[30px]" key={item.id} onClick={() => handleClick(item.id)}>
                  <item.icon size={25} />
                </button>
              );
            })}
          </div>
          {/* 設定関連のアイコン用 */}
          <div className="mb-4 flex flex-2 flex-col-reverse items-center">
            <button type="button" className="h-[30px] w-[30px]" onClick={openDialog}>
              <FaGear size={25} />
            </button>
          </div>
        </div>
        {/* エクスプローラーなどを入れる部分 */}
        <div className={"relative flex h-full flex-col border-l-1"} style={{ width: `${explorerWidth}px` }}>
          <div className="h-full w-full">
            {selectedSideBarItemId ? sideBarItems.find((item) => item.id === selectedSideBarItemId)?.component : null}
          </div>
          {/* splitter */}
          <div
            className="absolute right-0 h-full w-[5px] hover:cursor-col-resize hover:bg-blue-300"
            onMouseDown={handleExplorerMouseDown}
            onDrag={handleDraggable}
          />
        </div>
        {/* エディター（タブ） */}
        <div className="h-full flex-1 border-l-1">
          <TabContainer />
        </div>
      </div>
    </SettingProvider>
  );
}

export default App;
