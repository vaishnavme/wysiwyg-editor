import { Editor, Extension as TiptapExtension } from "@tiptap/core"; // Adjust according to your setup
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
import { ExtensionKey } from "../utils/editor.types";

interface Extension extends TiptapExtension {
  name: ExtensionKey;
}

interface Props {
  editor: Editor;
}

const Toolbar = (props: Props) => {
  const { editor } = props;

  const configuredExtension: Extension[] =
    editor?.extensionManager?.extensions.filter((ext): ext is Extension =>
      Object.prototype.hasOwnProperty.call(extensionMap, ext.name)
    ) || [];

  const activeExtensions = configuredExtension.reduce<
    Record<ExtensionKey, Extension>
  >((prev, curr) => {
    if (extensionMap[curr.name]) {
      prev[curr.name] = curr;
    }
    return prev;
  }, {} as Record<ExtensionKey, Extension>);

  return (
    <div className="sticky top-10 bg-white z-50 mb-20">
      <div className="border flex-wrap rounded-lg p-1 flex items-center gap-x-1 border-neutral-200 shadow-sm hover:text-neutral-900 dark:border-neutral-800 dark:hover:bg-neutral-800 dark:hover:text-neutral-50 ">
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
