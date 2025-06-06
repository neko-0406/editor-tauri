import { BaseDirectory, readTextFile } from "@tauri-apps/plugin-fs";
import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useEffect, useState } from "react";

export type SettingType = {
  theme: string;
  workspacePath: string;
  googleAuthId: string;
  googleAuthSecret: string;
  geminiApiKey: string;
};

export const defaultSetting: SettingType = {
  theme: "light",
  workspacePath: "",
  googleAuthId: "",
  googleAuthSecret: "",
  geminiApiKey: "",
};

const SettingContext = createContext<{
  setting: SettingType;
  setSetting: Dispatch<SetStateAction<SettingType>>;
}>({
  setting: defaultSetting,
  setSetting: () => {},
});

export function SettingProvider({ children }: { children: ReactNode }) {
  const [setting, setSetting] = useState<SettingType>(defaultSetting);

  useEffect(() => {
    const loadSetting = async () => {
      try {
        const baseDir = BaseDirectory.AppData;
        const content = await readTextFile("setting.json", { baseDir: baseDir });
        const json = JSON.parse(content);
        setSetting(json);
      } catch (error) {
        console.error("Error", error);
      }
    };

    loadSetting();
  }, []);

  return <SettingContext.Provider value={{ setting, setSetting }}>{children}</SettingContext.Provider>;
}

export const useSetting = () => useContext(SettingContext);
