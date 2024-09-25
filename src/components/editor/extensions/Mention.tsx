import { Mention as TiptapMention } from "@tiptap/extension-mention";
import { ReactRenderer } from "@tiptap/react";
import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import tippy, { Instance as TippyInstance } from "tippy.js";

interface MentionListProps {
  items: string[];
  command: (item: { id: string }) => void;
}

interface MentionListHandle {
  onKeyDown: (props: { event: KeyboardEvent }) => boolean;
}

const MentionList = forwardRef<MentionListHandle, MentionListProps>(
  (props, ref) => {
    const { items } = props;

    const optionListRef = useRef<HTMLDivElement[]>([]);
    const [selectedIndex, setSelectedIndex] = useState(0);

    const selectItem = (index: number) => {
      const item = items[index];
      if (item) {
        props.command({ id: item });
      }
    };

    const upHandler = () => {
      setSelectedIndex((selectedIndex + items.length - 1) % items.length);
    };

    const downHandler = () => {
      setSelectedIndex((selectedIndex + 1) % items.length);
    };

    const enterHandler = () => {
      selectItem(selectedIndex);
    };

    useEffect(() => setSelectedIndex(0), [items]);

    useImperativeHandle(ref, () => ({
      onKeyDown: ({ event }) => {
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

    return (
      <div className="bg-white max-h-72 overflow-y-auto border rounded-lg overflow-hidden shadow-xl w-64">
        <ul>
          {items.map((option, index) => {
            if (selectedIndex === index) {
              optionListRef.current[selectedIndex]?.scrollIntoView({
                block: "nearest",
              });
            }

            return (
              <li
                key={option}
                ref={(element) => {
                  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                  // @ts-expect-error
                  if (element) optionListRef.current[index] = element;
                }}
              >
                <button
                  type="button"
                  onClick={() => selectItem(index)}
                  className={`text-black flex items-center gap-x-4 px-4 py-2 hover:bg-neutral-100 transition-all ease-in-out cursor-pointer text-left w-full ${
                    selectedIndex === index ? "bg-neutral-100" : ""
                  }`}
                >
                  <p className="text-sm font-medium">{option}</p>
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
);

const Mention = TiptapMention.configure({
  HTMLAttributes: {
    class: "mention",
  },
  suggestion: {
    items: ({ query }) => {
      return [
        "Lea Thompson",
        "Cyndi Lauper",
        "Tom Cruise",
        "Madonna",
        // List continues
      ]
        .filter((item) => item.toLowerCase().startsWith(query.toLowerCase()))
        .slice(0, 5);
    },

    render: () => {
      let component: ReactRenderer | null = null;
      let popup: TippyInstance[] | null = null;

      return {
        onStart: (props) => {
          component = new ReactRenderer(MentionList, {
            props,
            editor: props.editor,
          });

          if (!props.clientRect) return;
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

        onUpdate(props) {
          component?.updateProps(props);

          if (!props.clientRect) return;

          popup?.[0].setProps({
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            getReferenceClientRect: props.clientRect,
          });
        },

        onKeyDown(props) {
          if (props.event.key === "Escape") {
            popup?.[0].hide();
            return true;
          }
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-expect-error
          return component?.ref?.onKeyDown(props) ?? false;
        },

        onExit() {
          popup?.[0].destroy();
          component?.destroy();
        },
      };
    },
  },
});

export default Mention;
