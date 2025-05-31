import { IconType } from "react-icons";
import { FaFolderTree } from "react-icons/fa6";

import { Explorer } from "./explorer/Explorer";

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
