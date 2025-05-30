import { ReactNode, useEffect, useState } from "react";
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
const data: TabItemData[] = [
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
  const [selectedTabId, setSelectedTabId] = useState<string | null>(null);

  useEffect(() => {
    console.log(selectedTabId);
  }, [selectedTabId]);

  return (
    <div className="w-full h-hull flex flex-col">
      {/* タブ上部のタグ表示部分 */}
      <div className="w-full h-[40px] flex flex-row bg-gray-100">
        {data?.map((item) => (
          <TabItemTag item={item} selectedTabId={selectedTabId} setSelectedTabId={setSelectedTabId} />
        ))}
      </div>
      {/* エディター部分 */}
      <div className="w-full h-100 top-40">
        {selectedTabId ? data?.find((item) => item.id === selectedTabId)?.editorComponent : null}
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
      key={item.id}
      onClick={() => setSelectedTabId(item.id)}
      className="mr-[1px] ml-[1px] px-2 cursor-pointer bg-gray-100 "
      style={{ backgroundColor: item.id === selectedTabId ? "white" : "#f3f4f6" }}
    >
      {item.name}
      <button type="button">
        <FaCircleXmark size={16} />{" "}
      </button>
    </div>
  );
}
