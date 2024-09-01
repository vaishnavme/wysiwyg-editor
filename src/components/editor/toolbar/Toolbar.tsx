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

type ExtensionKey =
  | "bold"
  | "italic"
  | "strike"
  | "link"
  | "code"
  | "codeBlock"
  | "bulletList"
  | "orderedList"
  | "horizontalRule"
  | "blockquote"
  | "heading"
  | "paragraph"
  | "taskList"
  | "underline"
  | "textAlign";

type ExtensionMap = Record<ExtensionKey, ExtensionKey>;

const extensionMap: ExtensionMap = {
  bold: "bold",
  italic: "italic",
  strike: "strike",
  link: "link",
  code: "code",
  codeBlock: "codeBlock",
  bulletList: "bulletList",
  orderedList: "orderedList",
  horizontalRule: "horizontalRule",
  blockquote: "blockquote",
  heading: "heading",
  paragraph: "paragraph",
  taskList: "taskList",
  underline: "underline",
  textAlign: "textAlign",
};

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
  console.log(
    "editor?.extensionManager?.extensions: ",
    editor?.extensionManager?.extensions
  );
  const activeExtensions = configuredExtension.reduce<
    Record<ExtensionKey, Extension>
  >((prev, curr) => {
    if (extensionMap[curr.name]) {
      prev[curr.name] = curr;
    }
    return prev;
  }, {} as Record<ExtensionKey, Extension>);

  return (
    <div className="flex items-center gap-x-2 my-4">
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

      {activeExtensions[extensionMap.heading] ? (
        <Heading editor={editor} />
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
  );
};

export default Toolbar;
