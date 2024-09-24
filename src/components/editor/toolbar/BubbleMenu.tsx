import { Editor, BubbleMenu as TiptapBubbleMenu } from "@tiptap/react";
import { getActiveExtensions } from "../utils/helpers";
import {
  Blockquote,
  Bold,
  Divider,
  Italic,
  Strike,
  Underline,
} from "./StyleToogles";
import { extensionMap } from "../utils/constants";

interface Props {
  editor: Editor;
}

const BubbleMenu = (props: Props) => {
  const { editor } = props;

  const activeExtensions = getActiveExtensions(editor);

  return (
    <TiptapBubbleMenu editor={editor} tippyOptions={{ duration: 100 }}>
      <div className="border shadow-md p-1 rounded-md">
        {activeExtensions[extensionMap.bold] ? <Bold editor={editor} /> : null}

        {activeExtensions[extensionMap.italic] ? (
          <Italic editor={editor} />
        ) : null}

        {activeExtensions[extensionMap.strike] ? (
          <Strike editor={editor} />
        ) : null}

        {activeExtensions[extensionMap.underline] ? (
          <Underline editor={editor} />
        ) : null}

        {activeExtensions[extensionMap.blockquote] ? (
          <Blockquote editor={editor} />
        ) : null}

        {activeExtensions[extensionMap.horizontalRule] ? (
          <Divider editor={editor} />
        ) : null}
      </div>
    </TiptapBubbleMenu>
  );
};

export default BubbleMenu;
