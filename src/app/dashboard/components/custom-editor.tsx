import React, { useState } from "react";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css"; // Import Quill styles

const QuillEditor = dynamic(() => import("react-quill"), { ssr: false });
export const Editor = ({
  onChangeValue,
  value,
}: {
  onChangeValue: (content: string) => void;
  value: string;
}) => {
  const [content, setContent] = useState("");
  const quillModules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "image", "video"],
      [{ align: [] }],
      [{ color: [] }],
      ["code-block"],
      ["clean"],
    ],
  };

  const quillFormats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "link",
    "image",
    "align",
    "color",
    "code-block",
  ];
  const handleEditorChange = (newContent: any) => {
    setContent(newContent);
    onChangeValue(newContent);
  };
  return (
    <QuillEditor
      onChange={handleEditorChange}
      modules={quillModules}
      defaultValue={value}
      formats={quillFormats}
      className="w-full h-[70%] mt-10 bg-white"
    />
  );
};
