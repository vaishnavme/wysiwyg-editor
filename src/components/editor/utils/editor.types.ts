export type ExtensionKey =
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

export type ExtensionMap = Record<ExtensionKey, ExtensionKey>;

export type Level = 1 | 2 | 3;
