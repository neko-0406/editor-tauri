// import { BaseDirectory, writeTextFile } from "@tauri-apps/plugin-fs";
import { useSetting } from "./SettingProvider";

type SettingProps = {
  isDialogOpen: boolean;
  setIsDialogOpen: (value: boolean) => void;
};

export function Setting({ isDialogOpen, setIsDialogOpen }: SettingProps) {
  const { setting, setSetting } = useSetting();
  const { theme, workspacePath, googleAuth, geminiApiKey } = setting;
  const themeData = ["system", "light", "dark"];

  return (
    <div className="absolute z-1 h-full w-full p-4">
      {isDialogOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-transparent">
          <div className="h-[80%] w-[80%] rounded-lg border-1 border-black bg-white p-6 shadow-xl">
            <h2 className="mb-4 text-xl font-semibold">設定</h2>

            <div className="mb-4 grid grid-cols-2">
              <label className="mb-1 block text-base font-medium">テーマ</label>
              <select
                className="w-full rounded-md border p-2 text-base"
                value={theme}
                onChange={(e) => setSetting({ ...setting, theme: e.target.value })}
              >
                {themeData.map((themeOption) => (
                  <option key={themeOption} value={themeOption}>
                    {themeOption === "system" ? "システム" : themeOption === "light" ? "ライト" : "ダーク"}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-4 grid grid-cols-2">
              <label className="mb-1 block text-base font-medium">ワークスペースパス</label>
              <input
                type="text"
                className="w-full rounded-md border p-2 text-base"
                value={workspacePath}
                onChange={(e) => setSetting({ ...setting, workspacePath: e.target.value })}
              />
            </div>

            <div className="mb-4 grid grid-cols-2">
              <label className="mb-1 block text-base font-medium">Google Auth ClientID</label>
              <input
                type="text"
                className="w-full rounded-md border p-2 text-base"
                value={googleAuth.clientId}
                onChange={(e) => setSetting({ ...setting, googleAuth: { ...googleAuth, clientId: e.target.value } })}
              />
            </div>

            <div className="mb-4 grid grid-cols-2">
              <label className="mb-1 block text-base font-medium">Google Auth ClientSecret</label>
              <input
                type="text"
                className="w-full rounded-md border p-2 text-base"
                value={googleAuth.clientSecret}
                onChange={(e) =>
                  setSetting({ ...setting, googleAuth: { ...googleAuth, clientSecret: e.target.value } })
                }
              />
            </div>

            <div className="mb-4 grid grid-cols-2">
              <label className="mb-1 block text-base font-medium">Gemini API Key</label>
              <input
                type="text"
                className="w-full rounded-md border p-2 text-base"
                value={geminiApiKey}
                onChange={(e) => setSetting({ ...setting, geminiApiKey: e.target.value })}
              />
            </div>

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
