import { Editor, Extension as TiptapExtension } from "@tiptap/core";
import { ExtensionKey } from "./editor.types";
import { extensionMap } from "./constants";

interface Extension extends TiptapExtension {
  name: ExtensionKey;
}

export const getActiveExtensions = (editor: Editor) => {
  const configuredExtension: Extension[] =
    editor?.extensionManager?.extensions.filter((ext): ext is Extension =>
      Object.prototype.hasOwnProperty.call(extensionMap, ext.name)
    ) || [];

  const activeExtensions = configuredExtension.reduce<
    Record<ExtensionKey, Extension>
  >((prev, curr) => {
    if (extensionMap[curr.name]) {
      prev[curr.name] = curr;
    }
    return prev;
  }, {} as Record<ExtensionKey, Extension>);

  return activeExtensions;
};
