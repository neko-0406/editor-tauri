import { useEffect, useState } from "react";
import { useSetting } from "../setting/SettingProvider";
import { invoke } from "@tauri-apps/api/core";
import Tree, { FileObject } from "./FileTree";

export function Explorer() {
  const { setting } = useSetting();
  const [tree, setTree] = useState<FileObject | null>(null);

  useEffect(() => {
    const fetchTree = async () => {
      const json = await invoke<FileObject>("get_file_tree", { path: setting.workspacePath });
      setTree(json);
    };

    fetchTree();
  }, []);

  return <>{tree ? <Tree fileObject={tree} /> : null}</>;
}
