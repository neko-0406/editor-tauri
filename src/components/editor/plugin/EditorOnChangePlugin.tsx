import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import { EditorState } from "lexical";
import { useEffect, useState } from "react";

export function EditorOnChangePlugin() {
  const [editor] = useLexicalComposerContext();
  const [state, setState] = useState<EditorState | null>(null);

  const handleChangeEditorStateHandler = (editorState: EditorState) => {
    setState(editorState);
  };

  useEffect(() => {
    // なんか使う
  }, [state]);

  return <OnChangePlugin onChange={handleChangeEditorStateHandler} />;
}
