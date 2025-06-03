import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import { EditorState } from "lexical";

type EditorOnChangePluginProps = {
  onEditorStateChange: (editorState: EditorState) => void
}

export function EditorOnChangePlugin({onEditorStateChange} : EditorOnChangePluginProps) {
  const [editor] = useLexicalComposerContext();

  return <OnChangePlugin onChange={onEditorStateChange} />;
}
