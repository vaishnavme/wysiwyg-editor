import { Editor } from "@tiptap/react";
import { Toggle } from "@/components/ui/toggle";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "@/components/ui/menubar";
import Icon from "@/components/icons";

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
    <Icon.TextBoldIcon size={16} />
  </Toggle>
);

export const Italic = ({ editor }: { editor: Editor }) => (
  <Toggle
    variant="outline"
    onClick={() => editor.chain().focus().toggleItalic().run()}
    {...getActiveProps(editor.isActive("italic"))}
  >
    <Icon.TextItalicIcon size={16} />
  </Toggle>
);

export const Strike = ({ editor }: { editor: Editor }) => (
  <Toggle
    variant="outline"
    onClick={() => editor.chain().focus().toggleStrike().run()}
    {...getActiveProps(editor.isActive("strike"))}
  >
    <Icon.TextStrikethroughIcon size={16} />
  </Toggle>
);

export const Text = ({ editor }: { editor: Editor }) => (
  <Toggle
    variant="outline"
    onClick={() => editor.chain().focus().setParagraph().run()}
  >
    <Icon.TextIcon size={16} />
  </Toggle>
);

export const Heading = ({ editor }: { editor: Editor }) => {
  return (
    <Menubar>
      <MenubarMenu>
        <MenubarTrigger>
          <Icon.HeadingIcon size={16} />
          <Icon.ArrowDown01Icon size={14} />
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
    <Icon.BulletListIcon size={16} />
  </Toggle>
);

export const OrderedList = ({ editor }: { editor: Editor }) => (
  <Toggle
    variant="outline"
    onClick={() => editor.chain().focus().toggleOrderedList().run()}
    {...getActiveProps(editor.isActive("orderedList"))}
  >
    <Icon.NumberListIcon size={16} />
  </Toggle>
);

export const Blockquote = ({ editor }: { editor: Editor }) => (
  <Toggle
    variant="outline"
    onClick={() => editor.chain().focus().toggleBlockquote().run()}
    {...getActiveProps(editor.isActive("blockquote"))}
  >
    <Icon.QuoteDownIcon size={16} />
  </Toggle>
);

export const Divider = ({ editor }: { editor: Editor }) => (
  <Toggle
    variant="outline"
    onClick={() => editor.chain().focus().setHorizontalRule().run()}
    aria-pressed={false}
    data-state="off"
  >
    <Icon.SolidLine01Icon size={16} />
  </Toggle>
);

export const TodoList = ({ editor }: { editor: Editor }) => (
  <Toggle
    variant="outline"
    onClick={() => editor.chain().focus().toggleTaskList().run()}
    {...getActiveProps(editor.isActive("taskList"))}
  >
    <Icon.CheckListIcon size={16} />
  </Toggle>
);

export const Underline = ({ editor }: { editor: Editor }) => (
  <Toggle
    variant="outline"
    onClick={() => editor.chain().focus().toggleUnderline().run()}
    {...getActiveProps(editor.isActive("underline"))}
  >
    <Icon.TextUnderlineIcon size={16} />
  </Toggle>
);
