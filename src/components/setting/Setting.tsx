// import { BaseDirectory, writeTextFile } from "@tauri-apps/plugin-fs";
import { useSetting } from "./SettingProvider";

type SettingProps = {
  isDialogOpen: boolean;
  setIsDialogOpen: (value: boolean) => void;
};

export function Setting({ isDialogOpen, setIsDialogOpen }: SettingProps) {
  const { setting, setSetting } = useSetting();
  const { theme, workspacePath } = setting;
  const data = ["system", "light", "dark"];

  return (
    <div className="absolute z-1 h-full w-full p-4">
      {isDialogOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-transparent">
          <div className="w-96 rounded-lg border-1 border-black bg-white p-6 shadow-xl">
            <h2 className="mb-4 text-xl font-semibold">設定</h2>

            <div className="mb-4">
              <label className="mb-1 block text-sm font-medium">テーマ</label>
              <select
                className="w-full rounded-md border p-2"
                value={theme}
                onChange={(e) => setSetting({ ...setting, theme: e.target.value })}
              >
                {data.map((themeOption) => (
                  <option key={themeOption} value={themeOption}>
                    {themeOption === "system" ? "システム" : themeOption === "light" ? "ライト" : "ダーク"}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-4">
              <label className="mb-1 block text-sm font-medium">ワークスペースパス</label>
              <input
                type="text"
                className="w-full rounded-md border p-2"
                value={workspacePath}
                onChange={(e) => setSetting({ ...setting, workspacePath: e.target.value })}
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
