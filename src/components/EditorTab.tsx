import { ReactNode, useState } from "react";
import { FaCircleXmark } from "react-icons/fa6";

export type TabItemData = {
  id: string;
  name: string;
  editorComponent: React.ReactNode;
};

export type TabContainerProps = {
  children?: ReactNode;
};

// テストデータ
const tabDatalist: TabItemData[] = [
  {
    id: "test-tab-tag1",
    name: "test-tab-tag1",
    editorComponent: <div>editor component1</div>,
  },
  {
    id: "test-tab-tag2",
    name: "test-tab-tag2",
    editorComponent: <div>editor component2</div>,
  },
  {
    id: "test-tab-tag3",
    name: "test-tab-tag3",
    editorComponent: <div>editor component3</div>,
  },
];

export function TabContainer() {
  // const [tabDatalist, _setTabDatalist] = useState<TabItemData[] | null>(data);
  const [selectedTabId, setSelectedTabId] = useState<string | null>(null);

  return (
    <div className="h-hull flex w-full flex-col">
      {/* タブ上部のタグ表示部分 */}
      <div className="flex h-[40px] w-full flex-row bg-gray-300">
        {tabDatalist
          ? tabDatalist.map((item) => (
              <TabItemTag key={item.id} item={item} selectedTabId={selectedTabId} setSelectedTabId={setSelectedTabId} />
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
  selectedTabId: string | null;
  setSelectedTabId: (id: string) => void;
};

export function TabItemTag({ item, selectedTabId, setSelectedTabId }: TabItemTagProps) {
  return (
    <div
      onClick={() => setSelectedTabId(item.id)}
      className="mr-[1px] ml-[1px] cursor-pointer px-2"
      style={{
        backgroundColor: item.id === selectedTabId ? "white" : "#e5e7eb",
      }}
    >
      {item.name}
      <button type="button">
        <FaCircleXmark size={16} />
      </button>
    </div>
  );
}
