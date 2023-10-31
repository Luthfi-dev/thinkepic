import React, { useState } from "react";
import dynamic from "next/dynamic";

const modules = {
  toolbar: [
    [],
    [],
    ["link", "video"],
    [{ header: "0" }, { header: "1" }, { header: "2" }, { font: [] }],
    [{ size: [] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["clean"],
  ],
  clipboard: {
    matchVisual: false,
  },
};

const QuillEditor = dynamic(() => import("react-quill"), { ssr: false });

const App = () => {
  const [value, setValue] = useState("");
  const [imageUrl, setImageUrl] = useState(
    "https://ex.luth.my.id/media/1693677330107_image.png"
  ); // Menambahkan state untuk URL gambar

  const handleChange = (value) => {
    setValue(value);
    console.log(value);
  };

  const insertImage = () => {
    if (imageUrl) {
      const imageHtml = `<img src="https://ex.luth.my.id/media/1693677330107_image.png" alt="Inserted Image" />`;
      const newValue = value + imageHtml;
      setValue(newValue);
      // setImageUrl(""); // Mengosongkan input URL gambar setelah menyisipkan gambar
    }
  };

  return (
    <div>
      {/* Input untuk URL gambar */}
      {/* <input
        type="text"
        placeholder="Masukkan URL Gambar"
        value={imageUrl}
        onChange={(e) => setImageUrl(e.target.value)}
      /> */}
      {/* Tombol untuk menyisipkan gambar */}
      <button
        type="button"
        onClick={insertImage}
        className="btn btn-app btn-sm"
        style={{
          position: "relative",
          marginBottom: "-80px",
          marginLeft: "5px",
        }}
      >
        + <span className="bi bi-image"></span>
      </button>
      {/* Quill Editor */}
      <QuillEditor
        value={value}
        modules={modules}
        onChange={handleChange}
        style={{
          height: "500px",
          backgroundColor: "white",
          borderRadius: "5px",
          padding: "10px",
          maxHeight: "500px",
          scrollbarColor: "darkgray lightgray",
          scrollbarWidth: "thin",
        }}
        readOnly
      />
    </div>
  );
};

export default App;
