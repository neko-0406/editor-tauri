import { createContext, useContext, useState, useEffect, Dispatch, SetStateAction, ReactNode } from "react";
import { BaseDirectory, readTextFile } from "@tauri-apps/plugin-fs";

export type SettingType = {
  theme: string;
  workspacePath: string;
  googleAuth: {
    clientId: string;
    clientSecret: string;
  };
};

const defaultSetting: SettingType = {
  theme: "light",
  workspacePath: "",
  googleAuth: {
    clientId: "",
    clientSecret: "",
  },
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
