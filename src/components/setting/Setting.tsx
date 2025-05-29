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
    <div className="w-full h-full p-4 absolute z-1">
      {isDialogOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-transparent">
          <div className="bg-white rounded-lg shadow-xl p-6 w-96 border-black border-1">
            <h2 className="text-xl font-semibold mb-4">設定</h2>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">テーマ</label>
              <select
                className="w-full p-2 border rounded-md"
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
              <label className="block text-sm font-medium mb-1">ワークスペースパス</label>
              <input
                type="text"
                className="w-full p-2 border rounded-md"
                value={workspacePath}
                onChange={(e) => setSetting({ ...setting, workspacePath: e.target.value })}
              />
            </div>

            <div className="flex justify-end gap-2 mt-6">
              <button
                className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300"
                onClick={() => {
                  setIsDialogOpen(false);
                }}
              >
                キャンセル
              </button>
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
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

      <div className="rounded-lg shadow-xl bg-black"></div>
    </div>
  );
}
