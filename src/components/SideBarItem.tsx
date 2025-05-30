import { IconType } from "react-icons";
import { Explorer } from "./explorer/Explorer";
import { FaFolderTree } from "react-icons/fa6";

export type sideMenuItem = {
  id: string;
  icon: IconType;
  component: JSX.Element;
};

export const sideBarItems: sideMenuItem[] = [
  {
    id: "explorer",
    icon: FaFolderTree,
    component: <Explorer />,
  },
];
