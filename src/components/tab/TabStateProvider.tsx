import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useState } from "react";

import { TabItemData } from "./EditorTab";

export type TabStateType = {
  openingTab: TabItemData | null;
  tabStateList: TabItemData[];
};

const defaultTabState: TabStateType = {
  openingTab: null,
  tabStateList: [],
};

const TabStateContext = createContext<{
  tabState: TabStateType;
  setTabState: Dispatch<SetStateAction<TabStateType>>;
}>({
  tabState: defaultTabState,
  setTabState: () => {},
});

export function TabStateProvider({ children }: { children: ReactNode }) {
  const [tabState, setTabState] = useState<TabStateType>(defaultTabState);

  return <TabStateContext.Provider value={{ tabState, setTabState }}>{children}</TabStateContext.Provider>;
}

export const useTabState = () => useContext(TabStateContext);
