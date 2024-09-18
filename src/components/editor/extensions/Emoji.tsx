/* eslint-disable @typescript-eslint/no-explicit-any */
import { Editor, mergeAttributes, Node, Range } from "@tiptap/core";
import { EditorState, PluginKey } from "@tiptap/pm/state";
import { DOMOutputSpec, Node as ProseMirrorNode } from "@tiptap/pm/model";
import Suggestion, {
  SuggestionProps,
  SuggestionOptions,
} from "@tiptap/suggestion";
import data from "@emoji-mart/data";
import { init, SearchIndex } from "emoji-mart";
import { ReactRenderer } from "@tiptap/react";
import tippy, { Instance as TippyInstance } from "tippy.js";
import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";

init({ data });

export interface EmojiNodeAttrs {
  /**
   * The name of the emoji, stored as a `data-name` attribute.
   */
  name: string | null;
  /**
   * The icon representation of the emoji, stored as a `data-icon` attribute.
   */
  icon: string | null;
}

interface EmojiSearchResult {
  id: string;
  name: string;
  skins: {
    native: string;
    shortcodes: string;
  }[];
}

interface EmojiItem {
  id: string;
  name: string;
  icon: string;
  shortcode: string;
}

interface CommandListProps {
  items: EmojiItem[];
  command: (item: EmojiItem) => void;
}

interface CommandListRef {
  onKeyDown: (props: { event: KeyboardEvent }) => boolean;
}

export interface EmojiNodeAttrs {
  /**
   * The identifier for the selected item that was mentioned, stored as a `data-id`
   * attribute.
   */
  id: string | null;
  /**
   * The label to be rendered by the editor as the displayed text for this mentioned
   * item, if provided. Stored as a `data-label` attribute. See `renderLabel`.
   */
  label?: string | null;
}

export type EmojiOptions<
  SuggestionItem,
  Attrs extends Record<string, any> = EmojiNodeAttrs
> = {
  HTMLAttributes: Record<string, any>;
  renderLabel?: (props: {
    options: EmojiOptions<SuggestionItem, Attrs>;
    node: ProseMirrorNode;
  }) => string;
  renderText: (props: {
    options: EmojiOptions<SuggestionItem, Attrs>;
    node: ProseMirrorNode;
  }) => string;
  renderHTML: (props: {
    options: EmojiOptions<SuggestionItem, Attrs>;
    node: ProseMirrorNode;
  }) => DOMOutputSpec;
  deleteTriggerWithBackspace: boolean;
  suggestion: Omit<SuggestionOptions<SuggestionItem, Attrs>, "editor">;
};

const EmojiPluginKey = new PluginKey("emoij");

const CommandList = forwardRef<CommandListRef, CommandListProps>(
  (props, ref) => {
    const { items, command } = props;

    const emojiListRef = useRef<(HTMLLIElement | null)[]>([]);
    const [selectedIndex, setSelectedIndex] = useState<number>(0);

    const selectItem = (index: number) => {
      const item = items[index];
      if (item) {
        command(item);
      }
    };

    const enterHandler = () => selectItem(selectedIndex);

    const downHandler = () => {
      setSelectedIndex((prevIndex) => (prevIndex + 1) % items.length);
    };

    const upHandler = () => {
      setSelectedIndex(
        (prevIndex) => (prevIndex + items.length - 1) % items.length
      );
    };

    useEffect(() => setSelectedIndex(0), [items]);

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
      <div className="bg-white h-72 overflow-y-auto border rounded-lg overflow-hidden shadow-xl w-56">
        <ul>
          {items.map((emoji, index) => {
            if (selectedIndex === index) {
              emojiListRef.current[selectedIndex]?.scrollIntoView({
                block: "nearest",
              });
            }
            return (
              <li
                key={emoji.id}
                ref={(element) => {
                  emojiListRef.current[index] = element;
                }}
              >
                <button
                  type="button"
                  onClick={() => selectItem(index)}
                  className={`text-black flex items-center gap-x-2 px-4 py-2 hover:bg-neutral-100 transition-all ease-in-out cursor-pointer text-left w-full ${
                    selectedIndex === index ? "bg-neutral-100" : ""
                  }`}
                >
                  <p className="text-base">{emoji.icon}</p>
                  <p>{emoji.shortcode}</p>
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
);

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
const EmojiCommand = Node.create<EmojiOptions>({
  name: "emoij",
  group: "inline",
  inline: true,
  selectable: false,
  atom: true,

  addOptions() {
    return {
      HTMLAttributes: {},
      deleteTriggerWithBackspace: false,
      renderText({ node }: { node: any }): string {
        return `${node.attrs.icon ?? node.attrs.name}`;
      },

      renderHTML({
        options,
        node,
      }: {
        options: any;
        node: any;
      }): (string | Record<string, any>)[] {
        return [
          "span",
          mergeAttributes(this.HTMLAttributes, options.HTMLAttributes),
          `${node.attrs.icon ?? node.attrs.name}`,
        ];
      },
      suggestion: {
        char: ":",
        pluginKey: EmojiPluginKey,
        command: ({
          editor,
          range,
          props,
        }: {
          editor: Editor;
          range: Range;
          props: EmojiItem;
        }) => {
          // increase range.to by one when the next node is of type "text"
          // and starts with a space character
          const nodeAfter = editor.view.state.selection.$to.nodeAfter;
          const overrideSpace = nodeAfter?.text?.startsWith(" ");

          if (overrideSpace) {
            range.to += 1;
          }
          editor
            .chain()
            .focus()
            .insertContentAt(range, [
              {
                type: this.name,
                attrs: props,
              },
              {
                type: "text",
                text: " ",
              },
            ])
            .run();

          window.getSelection()?.collapseToEnd();
        },
        allow: ({ state, range }: { state: EditorState; range: Range }) => {
          const $from = state.doc.resolve(range.from);
          const type = state.schema.nodes[this.name];
          const allow = !!$from.parent.type.contentMatch.matchType(type);

          return allow;
        },
      },
    };
  },

  addAttributes() {
    return {
      name: {
        default: null,
        parseHTML: (element) => element.getAttribute("data-name"),
        renderHTML: (attributes) => {
          if (!attributes.name) {
            return {};
          }

          return {
            "data-label": attributes.name,
          };
        },
      },
      icon: {
        default: null,
        parseHTML: (element) => element.getAttribute("data-icon"),
        renderHTML: (attributes) => {
          if (!attributes.icon) {
            return {};
          }

          return {
            "data-icon": attributes.icon,
          };
        },
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: `span[data-role="img"]`,
      },
    ];
  },

  renderHTML({ node, HTMLAttributes }) {
    if (this.options.renderLabel !== undefined) {
      return [
        "span",
        mergeAttributes(
          { "data-role": "img" },
          this.options.HTMLAttributes,
          HTMLAttributes
        ),
        this.options.renderLabel({
          options: this.options,
          node,
        }),
      ];
    }
    const mergedOptions = { ...this.options };

    mergedOptions.HTMLAttributes = mergeAttributes(
      { role: "img" },
      this.options.HTMLAttributes,
      HTMLAttributes
    );
    const html = this.options.renderHTML({
      options: mergedOptions,
      node,
    });

    if (typeof html === "string") {
      return [
        "span",
        mergeAttributes(
          { role: "img" },
          this.options.HTMLAttributes,
          HTMLAttributes
        ),
        html,
      ];
    }
    return html;
  },

  renderText({ node }) {
    if (this.options.renderLabel !== undefined) {
      return this.options.renderLabel({
        options: this.options,
        node,
      });
    }
    return this.options.renderText({
      options: this.options,
      node,
    });
  },

  addKeyboardShortcuts() {
    return {
      Backspace: () =>
        this.editor.commands.command(({ tr, state }) => {
          let isMention = false;
          const { selection } = state;
          const { empty, anchor } = selection;

          if (!empty) {
            return false;
          }

          state.doc.nodesBetween(anchor - 1, anchor, (node, pos) => {
            if (node.type.name === this.name) {
              isMention = true;
              tr.insertText(
                this.options.deleteTriggerWithBackspace
                  ? ""
                  : this.options.suggestion.char || "",
                pos,
                pos + node.nodeSize
              );

              return false;
            }
          });

          return isMention;
        }),
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

const Emoji = EmojiCommand.configure({
  suggestion: {
    items: async ({ query }: { query: string }): Promise<EmojiItem[]> => {
      const results: EmojiItem[] = [];

      if (query.length) {
        const response: EmojiSearchResult[] = await SearchIndex.search(query);

        return response.map(
          (emoji: EmojiSearchResult): EmojiItem => ({
            id: emoji.id,
            name: emoji.name,
            icon: emoji.skins[0].native,
            shortcode: emoji.skins[0].shortcodes,
          })
        );
      }

      return results;
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

          popup = tippy("body", {
            getReferenceClientRect: props.clientRect as () => DOMRect,
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
            getReferenceClientRect: props.clientRect as () => DOMRect,
          });
        },

        onKeyDown(props: { event: KeyboardEvent }) {
          if (props.event.key === "Escape") {
            popup[0].hide();
            return true;
          }
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-expect-error
          return component.ref?.onKeyDown(props) ?? false;
        },

        onExit() {
          popup[0].destroy();
          component.destroy();
        },
      };
    },
  },
});

export default Emoji;
