import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { Extension } from "@tiptap/core";
import Suggestion, { SuggestionProps } from "@tiptap/suggestion";
import { Editor, Range } from "@tiptap/react";
import { ReactRenderer } from "@tiptap/react";
import Icon from "@/components/icons";
import tippy, { Instance as TippyInstance } from "tippy.js";

interface SlashCommand {
  label: string;
  subText: string;
  icon: JSX.Element;
  command: (params: {
    editor: Editor;
    range: { from: number; to: number };
  }) => void;
}

interface CommandListProps {
  items: SlashCommand[];
  command: (item: SlashCommand) => void;
}

const slashCommandList: SlashCommand[] = [
  {
    label: "Text",
    subText: "Just start typing plain text.",
    icon: <Icon.TextIcon size={20} />,
    command: ({ editor, range }) =>
      editor.chain().focus().deleteRange(range).setParagraph().run(),
  },
  {
    label: "Heading 1",
    subText: "Big section heading.",
    icon: <Icon.Heading01Icon size={20} />,
    command: ({ editor, range }) =>
      editor.chain().focus().deleteRange(range).setHeading({ level: 1 }).run(),
  },
  {
    label: "Heading 2",
    subText: "Medium section heading.",
    icon: <Icon.Heading02Icon size={20} />,
    command: ({ editor, range }) =>
      editor.chain().focus().deleteRange(range).setHeading({ level: 2 }).run(),
  },
  {
    label: "Heading 3",
    subText: "Small section heading.",
    icon: <Icon.Heading03Icon size={20} />,
    command: ({ editor, range }) =>
      editor.chain().focus().deleteRange(range).setHeading({ level: 3 }).run(),
  },
  {
    label: "Blockquote",
    subText: "Capture a quote.",
    icon: <Icon.QuoteDownIcon size={20} />,
    command: ({ editor, range }) =>
      editor.chain().focus().deleteRange(range).toggleBlockquote().run(),
  },
  {
    label: "Bulleted List",
    subText: "Create a simple bulleted list.",
    icon: <Icon.BulletListIcon size={20} />,
    command: ({ editor, range }) =>
      editor.chain().focus().deleteRange(range).toggleBulletList().run(),
  },
  {
    label: "Numbered List",
    subText: "Create a list with numbering.",
    icon: <Icon.NumberListIcon size={20} />,
    command: ({ editor, range }) =>
      editor.chain().focus().deleteRange(range).toggleOrderedList().run(),
  },
];

const Commands = Extension.create({
  name: "slash",

  addOptions() {
    return {
      suggestion: {
        char: "/",
        command: ({
          editor,
          range,
          props,
        }: {
          editor: Editor;
          range: Range;
          props: CommandListProps;
        }) => {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-expect-error
          props.command({ editor, range });
        },
      },
    };
  },

  addProseMirrorPlugins() {
    return [
      Suggestion({
        editor: this.editor,
        ...this.options.suggestion,
      }),
    ];
  },
});

const CommandList = forwardRef<
  { onKeyDown: (params: { event: KeyboardEvent }) => boolean },
  CommandListProps
>(({ items, command }, ref) => {
  const slashListRef = useRef<HTMLDivElement[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const selectItem = (index: number) => {
    const item = items[index];

    if (item) {
      command(item);
    }
  };

  const enterHandler = () => selectItem(selectedIndex);

  const downHandler = () => {
    setSelectedIndex((selectedIndex + 1) % items.length);
  };

  const upHandler = () => {
    setSelectedIndex((selectedIndex + items.length - 1) % items.length);
  };

  useEffect(() => setSelectedIndex(0), []);

  useImperativeHandle(ref, () => ({
    onKeyDown: ({ event }: { event: KeyboardEvent }) => {
      if (event.key === "ArrowUp") {
        upHandler();
        return true;
      }

      if (event.key === "ArrowDown") {
        downHandler();
        return true;
      }

      if (event.key === "Enter") {
        enterHandler();
        return true;
      }

      return false;
    },
  }));

  if (!items?.length) return null;

  return (
    <div className="bg-white h-72 overflow-y-auto border rounded-lg overflow-hidden shadow-xl w-64">
      <ul>
        {items.map((option, index) => {
          if (selectedIndex === index) {
            slashListRef.current[selectedIndex]?.scrollIntoView({
              block: "nearest",
            });
          }

          return (
            <li
              key={option.label}
              ref={(element) => {
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-expect-error
                slashListRef.current[index] = element;
              }}
            >
              <button
                type="button"
                onClick={() => selectItem(index)}
                className={`text-black flex items-center gap-x-4 px-4 py-2 hover:bg-neutral-100 transition-all ease-in-out cursor-pointer text-left w-full ${
                  selectedIndex === index ? "bg-neutral-100" : ""
                }`}
              >
                {option.icon}
                <div>
                  <p className="text-sm font-medium">{option.label}</p>
                  <p className="text-xs text-neutral-500">{option.subText}</p>
                </div>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
});

const SlashCommand = Commands.configure({
  suggestion: {
    items: ({ query }: { query: string }) => {
      return slashCommandList.filter((item) =>
        item.label.toLowerCase().startsWith(query.toLowerCase())
      );
    },
    render: () => {
      let popup: TippyInstance[];
      let component: ReactRenderer;

      return {
        onStart: (props: SuggestionProps) => {
          component = new ReactRenderer(CommandList, {
            props,
            editor: props.editor,
          });

          if (!props.clientRect) {
            return;
          }
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-expect-error
          popup = tippy("body", {
            getReferenceClientRect: props.clientRect,
            appendTo: () => document.body,
            content: component.element,
            showOnCreate: true,
            interactive: true,
            trigger: "manual",
            placement: "bottom-start",
          });
        },

        onUpdate(props: SuggestionProps) {
          component.updateProps(props);

          if (!props.clientRect) {
            return;
          }

          popup[0].setProps({
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            getReferenceClientRect: props.clientRect,
          });
        },

        onKeyDown(props: { event: KeyboardEvent }) {
          if (props.event.key === "Escape") {
            popup[0].hide();

            return true;
          }
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-expect-error
          return component.ref?.onKeyDown(props);
        },

        onExit() {
          popup[0].destroy();
          component.destroy();
        },
      };
    },
  },
});

export default SlashCommand;
