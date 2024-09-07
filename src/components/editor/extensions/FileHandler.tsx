import { Extension } from "@tiptap/core";
import { Plugin, PluginKey } from "@tiptap/pm/state";

const FileHandler = Extension.create({
  name: "fileHandler",

  addOptions() {
    return {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      onFilePaste: (_file: unknown) => {
        return true;
      },
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      onFileDrop: (_file: unknown) => {
        return false;
      },
    };
  },

  addProseMirrorPlugins() {
    return [
      new Plugin({
        key: new PluginKey("fileHandler"),

        props: {
          handleDOMEvents: {
            drop: (_view, event) => {
              event.preventDefault();

              if (event?.dataTransfer?.files?.length) {
                const [file] = Array.from(event.dataTransfer.files);
                this.options.onFileDrop(file);
              }

              return true;
            },
            paste: (_view, event) => {
              event.preventDefault();
              if (event?.clipboardData?.files.length) {
                const [file] = Array.from(event.clipboardData.files);
                this.options.onFilePaste(file);
              }
            },
          },
        },
      }),
    ];
  },
});

export default FileHandler;
