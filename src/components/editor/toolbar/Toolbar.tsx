import { Editor } from "@tiptap/core"; // Adjust according to your setup
import {
  Blockquote,
  Bold,
  BulletList,
  Codeblock,
  Divider,
  Heading,
  Italic,
  OrderedList,
  Strike,
  Text,
  TextAlign,
  TodoList,
  Underline,
} from "./StyleToogles";
import { extensionMap } from "../utils/constants";
import { getActiveExtensions } from "../utils/helpers";

interface Props {
  editor: Editor;
}

const Toolbar = (props: Props) => {
  const { editor } = props;

  const activeExtensions = getActiveExtensions(editor);

  return (
    <div className="sticky top-10 bg-white z-50 mb-20">
      <div className="border flex-wrap rounded-lg p-1 flex items-center gap-2 border-neutral-200 shadow-sm hover:text-neutral-900 dark:border-neutral-800 dark:hover:bg-neutral-800 dark:hover:text-neutral-50 ">
        {activeExtensions[extensionMap.heading] ? (
          <Heading editor={editor} />
        ) : null}

        {activeExtensions[extensionMap.bold] ? <Bold editor={editor} /> : null}

        {activeExtensions[extensionMap.italic] ? (
          <Italic editor={editor} />
        ) : null}

        {activeExtensions[extensionMap.paragraph] ? (
          <Text editor={editor} />
        ) : null}

        {activeExtensions[extensionMap.strike] ? (
          <Strike editor={editor} />
        ) : null}

        {activeExtensions[extensionMap.underline] ? (
          <Underline editor={editor} />
        ) : null}

        {activeExtensions[extensionMap.codeBlock] ? (
          <Codeblock editor={editor} />
        ) : null}

        {activeExtensions[extensionMap.bulletList] ? (
          <BulletList editor={editor} />
        ) : null}

        {activeExtensions[extensionMap.orderedList] ? (
          <OrderedList editor={editor} />
        ) : null}

        {activeExtensions[extensionMap.taskList] ? (
          <TodoList editor={editor} />
        ) : null}

        {activeExtensions[extensionMap.blockquote] ? (
          <Blockquote editor={editor} />
        ) : null}

        {activeExtensions[extensionMap.horizontalRule] ? (
          <Divider editor={editor} />
        ) : null}

        {activeExtensions[extensionMap.textAlign] ? (
          <TextAlign editor={editor} />
        ) : null}
      </div>
    </div>
  );
};

export default Toolbar;
