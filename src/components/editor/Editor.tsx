import {
  Editor as TipTapEditor,
  EditorContent,
  useEditor,
} from "@tiptap/react";
import { editorMode, getEditorExtensionsByType } from "./extensions";
import { forwardRef, useImperativeHandle } from "react";
import Toolbar from "./toolbar/Toolbar";
import { content } from "./utils/content";

interface EditorProps {
  editable?: boolean;
  editorType: editorMode;
  onUpdate: (editor: TipTapEditor) => void;
}

export interface EditorRef {
  getHTML: () => string | undefined;
  getText: () => string | undefined;
  getJSON: () => Record<string, any> | undefined;
}

const Editor = forwardRef<EditorRef, EditorProps>((props, ref) => {
  const { editable = true, editorType } = props;

  const extensions = getEditorExtensionsByType(editorType);

  const editor = useEditor({
    extensions,
    editable,
    content,
    editorProps: {
      attributes: {
        class:
          "outline-none px-4 py-2 ring-2 ring-blue-100 rounded-lg prose max-w-4xl",
      },
    },
  });

  useImperativeHandle(
    ref,
    () => ({
      getHTML: () => editor?.getHTML(),
      getText: () => editor?.getText(),
      getJSON: () => editor?.getJSON(),
    }),
    []
  );

  if (!editor) {
    return null;
  }

  return (
    <div>
      <Toolbar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
});

export default Editor;
