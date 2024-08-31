import { EditorContent, useEditor } from "@tiptap/react";
import extensions from "./extensions";

const Editor = () => {
  const editor = useEditor({
    extensions,
    editorProps: {
      attributes: {
        class:
          "outline-none px-4 py-2 ring-2 ring-blue-100 rounded-lg prose max-w-4xl",
      },
    },
  });

  return <EditorContent editor={editor} />;
};

export default Editor;
