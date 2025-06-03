import { AutoFocusPlugin } from "@lexical/react/LexicalAutoFocusPlugin";
import { CharacterLimitPlugin } from "@lexical/react/LexicalCharacterLimitPlugin";
import { CheckListPlugin } from "@lexical/react/LexicalCheckListPlugin";
import { ClickableLinkPlugin } from "@lexical/react/LexicalClickableLinkPlugin";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";
import { HashtagPlugin } from "@lexical/react/LexicalHashtagPlugin";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { HorizontalRulePlugin } from "@lexical/react/LexicalHorizontalRulePlugin";
import { LinkPlugin } from "@lexical/react/LexicalLinkPlugin";
import { ListPlugin } from "@lexical/react/LexicalListPlugin";
import { MarkdownShortcutPlugin } from "@lexical/react/LexicalMarkdownShortcutPlugin";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { SelectionAlwaysOnDisplay } from "@lexical/react/LexicalSelectionAlwaysOnDisplay";
import { TabIndentationPlugin } from "@lexical/react/LexicalTabIndentationPlugin";
import { TablePlugin } from "@lexical/react/LexicalTablePlugin";
import { EditorState } from "lexical";

import theme from "./editorTheme";
import nodes from "./nodes";
import { EditorOnChangePlugin } from "./plugin/EditorOnChangePlugin";

type EditorProps = {
  editorState: EditorState | null | undefined;
  onEditorStateChange: (editorState: EditorState) => void;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function onError(error: any) {
  console.error(error);
}

export default function Editor({ editorState, onEditorStateChange }: EditorProps) {
  const initialConfig = {
    namespace: "tauri-editor",
    theme,
    onError,
    nodes: nodes,
    editorState: editorState ? editorState : undefined,
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
      <HorizontalRulePlugin />
      <CheckListPlugin />
      <TablePlugin hasCellMerge={true} hasCellBackgroundColor={true} hasHorizontalScroll={true} />
      <TabIndentationPlugin maxIndent={10} />
      <MarkdownShortcutPlugin />
      <SelectionAlwaysOnDisplay />
      <ClickableLinkPlugin />
      <CharacterLimitPlugin charset="UTF-8" maxLength={Number.MAX_SAFE_INTEGER} />
      <HashtagPlugin />
      <EditorOnChangePlugin onEditorStateChange={onEditorStateChange} />
    </LexicalComposer>
  );
}
