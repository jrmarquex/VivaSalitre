import { useRef, useEffect } from "react";

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
}

export default function RichTextEditor({ value, onChange }: RichTextEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (editorRef.current && editorRef.current.innerHTML !== value) {
      editorRef.current.innerHTML = value;
    }
  }, [value]);

  const handleInput = () => {
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML);
    }
  };

  const formatText = (command: string, value?: string) => {
    document.execCommand(command, false, value);
    editorRef.current?.focus();
  };

  return (
    <div className="border rounded-lg overflow-hidden">
      {/* Toolbar */}
      <div className="bg-gray-50 border-b p-2 flex flex-wrap gap-1">
        <button
          type="button"
          onClick={() => formatText("bold")}
          className="px-3 py-1 text-sm bg-white border rounded hover:bg-gray-100"
          data-testid="button-bold"
        >
          <strong>B</strong>
        </button>
        <button
          type="button"
          onClick={() => formatText("italic")}
          className="px-3 py-1 text-sm bg-white border rounded hover:bg-gray-100"
          data-testid="button-italic"
        >
          <em>I</em>
        </button>
        <button
          type="button"
          onClick={() => formatText("underline")}
          className="px-3 py-1 text-sm bg-white border rounded hover:bg-gray-100"
          data-testid="button-underline"
        >
          <u>U</u>
        </button>
        <div className="w-px bg-gray-300 mx-1" />
        <button
          type="button"
          onClick={() => formatText("formatBlock", "h2")}
          className="px-3 py-1 text-sm bg-white border rounded hover:bg-gray-100"
          data-testid="button-heading2"
        >
          H2
        </button>
        <button
          type="button"
          onClick={() => formatText("formatBlock", "h3")}
          className="px-3 py-1 text-sm bg-white border rounded hover:bg-gray-100"
          data-testid="button-heading3"
        >
          H3
        </button>
        <button
          type="button"
          onClick={() => formatText("formatBlock", "p")}
          className="px-3 py-1 text-sm bg-white border rounded hover:bg-gray-100"
          data-testid="button-paragraph"
        >
          P
        </button>
        <div className="w-px bg-gray-300 mx-1" />
        <button
          type="button"
          onClick={() => formatText("insertUnorderedList")}
          className="px-3 py-1 text-sm bg-white border rounded hover:bg-gray-100"
          data-testid="button-list"
        >
          • Lista
        </button>
        <button
          type="button"
          onClick={() => formatText("insertOrderedList")}
          className="px-3 py-1 text-sm bg-white border rounded hover:bg-gray-100"
          data-testid="button-numbered-list"
        >
          1. Lista
        </button>
        <div className="w-px bg-gray-300 mx-1" />
        <button
          type="button"
          onClick={() => {
            const url = prompt("Digite a URL do link:");
            if (url) formatText("createLink", url);
          }}
          className="px-3 py-1 text-sm bg-white border rounded hover:bg-gray-100"
          data-testid="button-link"
        >
          Link
        </button>
      </div>

      {/* Editor */}
      <div
        ref={editorRef}
        contentEditable
        onInput={handleInput}
        className="min-h-[300px] p-4 outline-none prose max-w-none"
        data-testid="rich-text-editor"
        style={{ 
          fontFamily: 'var(--font-sans)',
          lineHeight: '1.6'
        }}
      />
    </div>
  );
}
