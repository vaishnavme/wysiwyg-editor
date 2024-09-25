import TaskItem from "@tiptap/extension-task-item";
import TaskList from "@tiptap/extension-task-list";
import { Link as TiptapLink } from "@tiptap/extension-link";
import { TextAlign as TipTapTextAlign } from "@tiptap/extension-text-align";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import Underline from "@tiptap/extension-underline";
import StarterKit from "@tiptap/starter-kit";
import { all, createLowlight } from "lowlight";
import SlashCommand from "./SlashCommand";
import Emoji from "./Emoji";
import Mention from "./Mention";

const Link = TiptapLink.extend({ inclusive: false }).configure({
  autolink: true,
  openOnClick: false,
  HTMLAttributes: {
    rel: "noopener noreferrer",
    target: "_blank",
  },
});

const TextAlign = TipTapTextAlign.configure({
  alignments: ["left", "right", "center"],
  types: ["heading", "paragraph"],
});

const lowlight = createLowlight(all);

const CodeBlock = CodeBlockLowlight.configure({
  lowlight,
});

const minimalExtensionSet = [StarterKit, Link];

const fullFeaturedExtensionSet = [
  StarterKit.configure({
    heading: {
      levels: [1, 2, 3],
    },
    codeBlock: false,
  }),
  TaskItem,
  TaskList,
  Underline,
  SlashCommand,
  Emoji,
  Link,
  TextAlign,
  CodeBlock,
  Mention,
];

const defaultExtensionSet = [StarterKit, Link, TaskItem, TaskList];

export enum editorMode {
  minimal = "minimal",
  fullFeatured = "fullFeatured",
}

export const getEditorExtensionsByType = (editorType: editorMode | null) => {
  switch (editorType) {
    case editorMode.minimal:
      return minimalExtensionSet;

    case editorMode.fullFeatured:
      return fullFeaturedExtensionSet;

    default:
      return defaultExtensionSet;
  }
};
