import { FaFolder } from "react-icons/fa6";

type SettingFieldProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: "text" | "select" | "folder";
  options?: { value: string; label: string }[];
};

export function SettingField({ label, value, onChange, type = "text", options = [] }: SettingFieldProps) {
  return (
    <div className="mb-4 grid grid-cols-2">
      <label className="mb-1 block text-base font-medium">{label}</label>
      {type === "text" ? (
        <input
          type="text"
          className="w-full rounded-md border p-2 text-base"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      ) : type === "folder" ? (
        <div className="relative flex items-center">
          <input
            type="text"
            className="w-full rounded-md border p-2 text-base"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="フォルダを選択"
          />
          <FaFolder className="mr-2 ml-4" size={25} />
        </div>
      ) : (
        <select
          className="w-full rounded-md border p-2 text-base"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      )}
    </div>
  );
}
