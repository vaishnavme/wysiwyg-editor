import Link from "@tiptap/extension-link";
import TaskItem from "@tiptap/extension-task-item";
import TaskList from "@tiptap/extension-task-list";
import TextAlign from "@tiptap/extension-text-align";
import Underline from "@tiptap/extension-underline";
import StarterKit from "@tiptap/starter-kit";
import SlashCommand from "./SlashCommand";
import Emoji from "./Emoji";

const extensions = [
  StarterKit.configure({
    heading: {
      levels: [1, 2, 3],
    },
  }),
  TaskItem,
  TaskList,
  Underline,
  SlashCommand,
  Emoji,
  TextAlign.configure({
    alignments: ["left", "right", "center"],
    types: ["heading", "paragraph"],
  }),
  Link.extend({ inclusive: false }).configure({
    autolink: true,
    openOnClick: false,
    HTMLAttributes: {
      rel: "noopener noreferrer",
      target: "_blank",
    },
  }),
];

export default extensions;
