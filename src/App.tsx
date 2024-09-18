import { Editor } from "./components/editor";
import { editorMode } from "./components/editor/extensions";

const App = () => {
  return (
    <div className="mx-auto p-6 max-w-4xl">
      <Editor
        editable
        editorType={editorMode.fullFeatured}
        onUpdate={(editor) => editor.getHTML()}
      />
    </div>
  );
};

export default App;
