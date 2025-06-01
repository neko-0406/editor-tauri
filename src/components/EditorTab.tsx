import { ReactNode, useCallback, useState } from "react";
import { FaCircleXmark } from "react-icons/fa6";

import Editor from "./editor/Editor";

export type TabItemData = {
  id: string;
  name: string;
  editorComponent: React.ReactNode;
};

export type TabContainerProps = {
  children?: ReactNode;
};

// テストデータ
const data: TabItemData[] = [
  {
    id: "test-tab-tag1",
    name: "test-tab-tag1",
    editorComponent: <Editor />,
  },
  {
    id: "test-tab-tag2",
    name: "test-tab-tag2",
    editorComponent: <Editor />,
  },
  {
    id: "test-tab-tag3",
    name: "test-tab-tag3",
    editorComponent: <Editor />,
  },
];

export function TabContainer() {
  const [tabDatalist, setTabDatalist] = useState<TabItemData[]>(data);
  const [selectedTabId, setSelectedTabId] = useState<string | null>(null);

  const handleSetTabDataList = useCallback((list: TabItemData[]) => {
    setTabDatalist(list);
  }, []);

  return (
    <div className="h-hull flex w-full flex-col">
      {/* タブ上部のタグ表示部分 */}
      <div className="flex h-[40px] w-full flex-row bg-gray-300">
        {tabDatalist
          ? tabDatalist.map((item) => (
              <TabItemTag
                key={item.id}
                item={item}
                itemlist={tabDatalist}
                selectedTabId={selectedTabId}
                setSelectedTabId={setSelectedTabId}
                setTabDatalist={handleSetTabDataList}
              />
            ))
          : null}
      </div>
      {/* エディター部分 */}
      <div className="top-40 h-full w-full">
        {selectedTabId
          ? tabDatalist
            ? tabDatalist.find((item) => item.id === selectedTabId)?.editorComponent
            : null
          : null}
      </div>
    </div>
  );
}

export type TabItemTagProps = {
  item: TabItemData;
  itemlist: TabItemData[];
  selectedTabId: string | null;
  setSelectedTabId: (id: string) => void;
  setTabDatalist: (list: TabItemData[]) => void;
};

export function TabItemTag({ item, itemlist, selectedTabId, setSelectedTabId, setTabDatalist }: TabItemTagProps) {
  const handleClickDelete = useCallback(() => {
    setTabDatalist(itemlist.filter((data) => data.id !== item.id));
  }, [item.id, itemlist, setTabDatalist]);

  return (
    <div
      onClick={() => setSelectedTabId(item.id)}
      className="mr-[1px] ml-[1px] flex cursor-pointer items-center justify-center px-2"
      style={{
        backgroundColor: item.id === selectedTabId ? "white" : "#e5e7eb",
      }}
    >
      {item.name}
      <button type="button" onClick={handleClickDelete} className="ml-2">
        <FaCircleXmark size={16} />
      </button>
    </div>
  );
}
