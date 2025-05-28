import { IconType } from "react-icons";

type SideBarItemProps = {
  id: string;
  SidebarIcon: IconType;
  selectedItem: string;
  setSelectedItem: (selfId: string) => void;
};

export type SideBarItemData = {
  id: string;
  SidebarIcon: IconType;
  eventHandler: () => void;
};

export function SideBarItem({ id, SidebarIcon, selectedItem, setSelectedItem }: SideBarItemProps) {
  return (
    <label key={id}>
      <input
        className="hidden"
        type="radio"
        value={id}
        checked={selectedItem === id}
        onChange={() => setSelectedItem(id)}
        name="side-items"
      />
      <SidebarIcon />
    </label>
  );
}
