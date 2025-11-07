"use client";

import { useRef, useMemo, useState, useEffect } from "react";
import dynamic from "next/dynamic";

// lazy-load editor on client only
const JoditEditor = dynamic(() => import("jodit-react"), { ssr: false });

export default function RichTextEditor({
  value = "",
  onChange = () => {},
  height = 400,
}) {
  const editorRef = useRef(null);
  const [activeTab, setActiveTab] = useState("visual");
  const [textValue, setTextValue] = useState(value);

  // sync text tab with external value
  useEffect(() => {
    if (activeTab === "text") {
      setTextValue(value);
    }
  }, [value, activeTab]);

  // editor config
  const config = useMemo(
    () => ({
      readonly: false,
      height,
      toolbarAdaptive: false,
      toolbarSticky: false,
      placeholder: "Write your blog content here…",
      disablePlugins: ["powered-by-jodit", "autosave"],
      uploader: { insertImageAsBase64URI: true },
      buttons: [
        "source", "|",
        "bold", "italic", "underline", "strikethrough", "|",
        "ul", "ol", "indent", "outdent", "|",
        "font", "fontsize", "brush", "paragraph", "|",
        "align", "link", "image", "table", "hr", "|",
        "undo", "redo", "fullsize", "selectall", "print", "eraser",
      ],
    }),
    [height]
  );

<style jsx>{`
  .flex.items-center.justify-between.text-xs.text-gray-500 > span:last-child {
    display: none !important;
  }
`}</style>

  // tab button (reusable)
  const TabButton = ({ id, children }) => {
    const isActive = activeTab === id;
    return (
      <button
        type="button"
        onClick={() => setActiveTab(id)}
        className={[
          "px-3 py-1.5 text-sm cursor-pointer rounded-lg border transition",
          isActive
            ? "thmbtn  shadow-sm"
            : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50",
        ].join(" ")}
      >
        {children}
      </button>
    );
  };

  return (
    <div className="w-full">
      {/* Tabs */}
      <div className="mb-3 flex items-center gap-2">
        <TabButton id="visual">Visual</TabButton>
        <TabButton id="text">Text</TabButton>
      </div>

      {/* Editors */}
      {activeTab === "visual" ? (
        <div className="rounded-xl overflow-hidden border border-[#e5e7eb]">
          <JoditEditor
            ref={editorRef}
            value={value}
            config={config}
            onBlur={(newContent) => onChange(newContent)}
          />
        </div>
      ) : (
        <div className="rounded-xl border border-[#e5e7eb]">
          <textarea
            value={textValue}
            onChange={(e) => {
              setTextValue(e.target.value);
              onChange(e.target.value);
            }}
            style={{ height: typeof height === "number" ? height : 400 }}
            className="w-full p-3 font-mono text-sm bg-white outline-none rounded-xl"
            placeholder="Edit raw HTML here…"
          />
        </div>
      )}
    </div>
  );
}
