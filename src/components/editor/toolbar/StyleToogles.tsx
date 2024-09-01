import { Editor } from "@tiptap/react";
import { Toggle } from "@/components/ui/toggle";
import {
  BoldIcon,
  ChevronDown,
  HeadingIcon,
  ItalicIcon,
  List,
  ListOrdered,
  ListTodo,
  Minus,
  Quote,
  StrikethroughIcon,
  TypeIcon,
  UnderlineIcon,
} from "lucide-react";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "@/components/ui/menubar";

const getActiveProps = (isActive = false) => {
  const activeProps = {
    "aria-pressed": false,
    "data-state": "off",
  };

  if (isActive) {
    activeProps["aria-pressed"] = true;
    activeProps["data-state"] = "on";
  }

  return activeProps;
};

export const Bold = ({ editor }: { editor: Editor }) => (
  <Toggle
    variant="outline"
    onClick={() => editor.chain().focus().toggleBold().run()}
    {...getActiveProps(editor.isActive("bold"))}
  >
    <BoldIcon size={16} />
  </Toggle>
);

export const Italic = ({ editor }: { editor: Editor }) => (
  <Toggle
    variant="outline"
    onClick={() => editor.chain().focus().toggleItalic().run()}
    {...getActiveProps(editor.isActive("italic"))}
  >
    <ItalicIcon size={16} />
  </Toggle>
);

export const Strike = ({ editor }: { editor: Editor }) => (
  <Toggle
    variant="outline"
    onClick={() => editor.chain().focus().toggleStrike().run()}
    {...getActiveProps(editor.isActive("strike"))}
  >
    <StrikethroughIcon size={16} />
  </Toggle>
);

export const Text = ({ editor }: { editor: Editor }) => (
  <Toggle
    variant="outline"
    onClick={() => editor.chain().focus().setParagraph().run()}
  >
    <TypeIcon size={16} />
  </Toggle>
);

export const Heading = ({ editor }: { editor: Editor }) => {
  return (
    <Menubar>
      <MenubarMenu>
        <MenubarTrigger>
          <HeadingIcon size={16} />
          <ChevronDown size={14} />
        </MenubarTrigger>
        <MenubarContent className="w-24">
          <MenubarItem
            onClick={() => editor.commands.toggleHeading({ level: 1 })}
          >
            Heading 1
          </MenubarItem>
          <MenubarItem
            onClick={() => editor.commands.toggleHeading({ level: 2 })}
          >
            Heading 2
          </MenubarItem>
          <MenubarItem
            onClick={() => editor.commands.toggleHeading({ level: 3 })}
          >
            Heading 3
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
};

export const BulletList = ({ editor }: { editor: Editor }) => (
  <Toggle
    variant="outline"
    onClick={() => editor.chain().focus().toggleBulletList().run()}
    {...getActiveProps(editor.isActive("bulletList"))}
  >
    <List size={16} />
  </Toggle>
);

export const OrderedList = ({ editor }: { editor: Editor }) => (
  <Toggle
    variant="outline"
    onClick={() => editor.chain().focus().toggleOrderedList().run()}
    {...getActiveProps(editor.isActive("orderedList"))}
  >
    <ListOrdered size={16} />
  </Toggle>
);

export const Blockquote = ({ editor }: { editor: Editor }) => (
  <Toggle
    variant="outline"
    onClick={() => editor.chain().focus().toggleBlockquote().run()}
    {...getActiveProps(editor.isActive("blockquote"))}
  >
    <Quote size={16} />
  </Toggle>
);

export const Divider = ({ editor }: { editor: Editor }) => (
  <Toggle
    variant="outline"
    onClick={() => editor.chain().focus().setHorizontalRule().run()}
    aria-pressed={false}
    data-state="off"
  >
    <Minus size={16} />
  </Toggle>
);

export const TodoList = ({ editor }: { editor: Editor }) => (
  <Toggle
    variant="outline"
    onClick={() => editor.chain().focus().toggleTaskList().run()}
    {...getActiveProps(editor.isActive("taskList"))}
  >
    <ListTodo size={16} />
  </Toggle>
);

export const Underline = ({ editor }: { editor: Editor }) => (
  <Toggle
    variant="outline"
    onClick={() => editor.chain().focus().toggleUnderline().run()}
    {...getActiveProps(editor.isActive("underline"))}
  >
    <UnderlineIcon size={16} />
  </Toggle>
);
