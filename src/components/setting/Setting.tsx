import { BaseDirectory, writeTextFile } from "@tauri-apps/plugin-fs";

import { SettingField } from "./SettingField";
import { useSetting } from "./SettingProvider";

type SettingProps = {
  isDialogOpen: boolean;
  setIsDialogOpen: (value: boolean) => void;
};

export function Setting({ isDialogOpen, setIsDialogOpen }: SettingProps) {
  const { setting, setSetting } = useSetting();
  const { theme, workspacePath, googleAuth, geminiApiKey } = setting;
  const themeOptions = [
    { value: "system", label: "システム" },
    { value: "light", label: "ライト" },
    { value: "dark", label: "ダーク" },
  ];

  return (
    <div className="absolute z-1 h-full w-full p-4">
      {isDialogOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-transparent">
          <div className="h-[80%] w-[80%] rounded-lg border-1 border-black bg-white p-6 shadow-xl">
            <h2 className="mb-4 text-xl font-semibold">設定</h2>

            <SettingField
              label="テーマ"
              value={theme}
              onChange={(value) => setSetting({ ...setting, theme: value })}
              type="select"
              options={themeOptions}
            />

            <SettingField
              label="ワークスペースパス"
              value={workspacePath}
              onChange={(value) => setSetting({ ...setting, workspacePath: value })}
            />

            <SettingField
              label="Google Auth ClientID"
              value={googleAuth.clientId}
              onChange={(value) => setSetting({ ...setting, googleAuth: { ...googleAuth, clientId: value } })}
            />

            <SettingField
              label="Google Auth ClientSecret"
              value={googleAuth.clientSecret}
              onChange={(value) => setSetting({ ...setting, googleAuth: { ...googleAuth, clientSecret: value } })}
            />

            <SettingField
              label="Gemini API Key"
              value={geminiApiKey}
              onChange={(value) => setSetting({ ...setting, geminiApiKey: value })}
            />

            <div className="mt-6 flex justify-end gap-2">
              <button
                className="rounded-md bg-gray-200 px-4 py-2 hover:bg-gray-300"
                onClick={() => {
                  setIsDialogOpen(false);
                }}
              >
                キャンセル
              </button>
              <button
                className="rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
                onClick={() => {
                  const baseDir = BaseDirectory.AppData;
                  console.log(setting);
                  setSetting(setting);
                  console.log(setting);
                  writeTextFile("setting.json", JSON.stringify(setting, null, 2), { baseDir: baseDir });
                  setIsDialogOpen(false);
                }}
              >
                保存
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="rounded-lg bg-black shadow-xl"></div>
    </div>
  );
}
