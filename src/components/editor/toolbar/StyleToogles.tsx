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
import { Level } from "../utils/editor.types";

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
    onClick={() => editor.chain().focus().toggleBold().run()}
    {...getActiveProps(editor.isActive("bold"))}
  >
    <Icon.TextBoldIcon size={16} />
  </Toggle>
);

export const Italic = ({ editor }: { editor: Editor }) => (
  <Toggle
    onClick={() => editor.chain().focus().toggleItalic().run()}
    {...getActiveProps(editor.isActive("italic"))}
  >
    <Icon.TextItalicIcon size={16} />
  </Toggle>
);

export const Strike = ({ editor }: { editor: Editor }) => (
  <Toggle
    onClick={() => editor.chain().focus().toggleStrike().run()}
    {...getActiveProps(editor.isActive("strike"))}
  >
    <Icon.TextStrikethroughIcon size={16} />
  </Toggle>
);

export const Text = ({ editor }: { editor: Editor }) => (
  <Toggle
    onClick={() => editor.chain().focus().setParagraph().run()}
    aria-pressed={false}
    data-state="off"
  >
    <Icon.TextIcon size={16} />
  </Toggle>
);

const levels: Level[] = [1, 2, 3];

export const Heading = ({ editor }: { editor: Editor }) => {
  const activeHeading = levels.find((level) =>
    editor?.isActive("heading", { level })
  );

  return (
    <Menubar>
      <MenubarMenu>
        <MenubarTrigger className="font-normal w-40 flex items-center justify-between">
          <div>{activeHeading ? <>Heading {activeHeading}</> : <>Text</>}</div>
          <Icon.ArrowDown01Icon size={14} />
        </MenubarTrigger>

        <MenubarContent>
          <MenubarItem
            onClick={() => editor.chain().focus().setParagraph().run()}
          >
            Text
          </MenubarItem>

          {levels.map((level) => (
            <MenubarItem key={`level-${level}`}>
              <button
                onClick={() => editor.commands.setHeading({ level })}
                type="button"
              >
                Heading {level}
              </button>
            </MenubarItem>
          ))}
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
};

export const BulletList = ({ editor }: { editor: Editor }) => (
  <Toggle
    onClick={() => editor.chain().focus().toggleBulletList().run()}
    {...getActiveProps(editor.isActive("bulletList"))}
  >
    <Icon.BulletListIcon size={16} />
  </Toggle>
);

export const OrderedList = ({ editor }: { editor: Editor }) => (
  <Toggle
    onClick={() => editor.chain().focus().toggleOrderedList().run()}
    {...getActiveProps(editor.isActive("orderedList"))}
  >
    <Icon.NumberListIcon size={16} />
  </Toggle>
);

export const Blockquote = ({ editor }: { editor: Editor }) => (
  <Toggle
    onClick={() => editor.chain().focus().toggleBlockquote().run()}
    {...getActiveProps(editor.isActive("blockquote"))}
  >
    <Icon.QuoteDownIcon size={16} />
  </Toggle>
);

export const Divider = ({ editor }: { editor: Editor }) => (
  <Toggle
    onClick={() => editor.chain().focus().setHorizontalRule().run()}
    aria-pressed={false}
    data-state="off"
  >
    <Icon.SolidLine01Icon size={16} />
  </Toggle>
);

export const TodoList = ({ editor }: { editor: Editor }) => (
  <Toggle
    onClick={() => editor.chain().focus().toggleTaskList().run()}
    {...getActiveProps(editor.isActive("taskList"))}
  >
    <Icon.CheckListIcon size={16} />
  </Toggle>
);

export const Underline = ({ editor }: { editor: Editor }) => (
  <Toggle
    onClick={() => editor.chain().focus().toggleUnderline().run()}
    {...getActiveProps(editor.isActive("underline"))}
  >
    <Icon.TextUnderlineIcon size={16} />
  </Toggle>
);

export const Codeblock = ({ editor }: { editor: Editor }) => (
  <Toggle
    onClick={() => editor.chain().focus().toggleCodeBlock().run()}
    {...getActiveProps(editor.isActive("codeblock"))}
  >
    <Icon.SourceCodeIcon size={16} />
  </Toggle>
);

export const TextAlign = ({ editor }: { editor: Editor }) => {
  return (
    <Menubar>
      <MenubarMenu>
        <MenubarTrigger>
          <Icon.TextAlignLeft01Icon size={16} />
          <Icon.ArrowDown01Icon size={14} />
        </MenubarTrigger>
        <MenubarContent className="w-24">
          <MenubarItem
            onClick={() => editor.chain().focus().setTextAlign("left").run()}
          >
            Left Align
          </MenubarItem>
          <MenubarItem
            onClick={() => editor.chain().focus().setTextAlign("center").run()}
          >
            Center Align
          </MenubarItem>
          <MenubarItem
            onClick={() => editor.chain().focus().setTextAlign("right").run()}
          >
            Right Align
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
};
