import { AutoFocusPlugin } from "@lexical/react/LexicalAutoFocusPlugin";
import { CheckListPlugin } from "@lexical/react/LexicalCheckListPlugin";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { LinkPlugin } from "@lexical/react/LexicalLinkPlugin";
import { ListPlugin } from "@lexical/react/LexicalListPlugin";
import { MarkdownShortcutPlugin } from "@lexical/react/LexicalMarkdownShortcutPlugin";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { SelectionAlwaysOnDisplay } from "@lexical/react/LexicalSelectionAlwaysOnDisplay";
import { TabIndentationPlugin } from "@lexical/react/LexicalTabIndentationPlugin";
import { TablePlugin } from "@lexical/react/LexicalTablePlugin";

import { EditorOnChangePlugin, onChange } from "../../hooks/EditorOnChangePlugin";
import theme from "./editorTheme";
import nodes from "./nodes";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function onError(error: any) {
  console.error(error);
}

export default function Editor() {
  const initialConfig = {
    namespace: "tauri-editor",
    theme,
    onError,
    nodes: nodes,
  };

  return (
    <LexicalComposer initialConfig={initialConfig}>
      <RichTextPlugin
        contentEditable={
          <ContentEditable
            className="focus-visible:outline-none"
            aria-placeholder="enter some text..."
            placeholder={<div>enter some text...</div>}
          />
        }
        ErrorBoundary={LexicalErrorBoundary}
      />
      <HistoryPlugin />
      <AutoFocusPlugin />
      <LinkPlugin />
      <ListPlugin />
      <CheckListPlugin />
      <TablePlugin />
      <TabIndentationPlugin maxIndent={10} />
      <MarkdownShortcutPlugin />
      <SelectionAlwaysOnDisplay />
      <EditorOnChangePlugin onChange={onChange} />
    </LexicalComposer>
  );
}
