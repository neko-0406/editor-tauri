// import { $convertToMarkdownString, TRANSFORMERS } from "@lexical/markdown";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
// import { BaseDirectory, exists, mkdir, writeTextFile } from "@tauri-apps/plugin-fs";
import { EditorState } from "lexical";
import { useEffect } from "react";

type EditorOnChangeProps = {
  onChange: (state: EditorState) => void;
};

export function EditorOnChangePlugin({ onChange }: EditorOnChangeProps) {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    return editor.registerUpdateListener(({ editorState }) => {
      onChange(editorState);
    });
  }, [editor, onChange]);

  return null;
}

export function onChange(editorState: EditorState) {
  editorState.read(async () => {
    try {
      // const baseDir = BaseDirectory.AppData;
      // const markdown = $convertToMarkdownString(TRANSFORMERS);
      // await writeTextFile("editor.md", markdown, { baseDir: baseDir });
      // console.log("File saved!");
    } catch (error) {
      console.error("Error", error);
    }
  });
}

// export async function checkDir() {
//   const baseDir = BaseDirectory.AppData;
//   const appDataExists = await exists(".", { baseDir: baseDir });
//   if (!appDataExists) {
//     await mkdir(".", { baseDir: baseDir, recursive: true });
//     console.log("Directory created!");
//   }
// }
