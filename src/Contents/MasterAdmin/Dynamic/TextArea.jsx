import 'react-quill/dist/quill.snow.css'
import React from 'react';
import dynamic from 'next/dynamic';
import { useState } from 'react';

const QuillNoSSRWrapper = dynamic(import('react-quill'), {
  ssr: false,
  loading: () => <p>Loading ...</p>,
});

const modules = {
  toolbar: [
    [{ header: '1' }, { header: '2' }, { header: '3' }, { font: [] }],
    [{ size: [] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [
      { list: 'ordered' },
      { list: 'bullet' },
      { indent: '-1' },
      { indent: '+1' },
    ],
    ['link', 'image', 'video'],
    ['clean'],
  ],
  clipboard: {
    matchVisual: false,
  },
};

export default function QuillEditor() {
  const [content, setContent] = useState('');

  return (
    <QuillNoSSRWrapper modules={modules} value={content} onChange={setContent} theme="snow" 
  // style={{
  //   height: '500px',
  //   backgroundColor: 'white',
  //   borderRadius: '5px',
  //   padding: '10px',
  //   maxHeight: '500px', 
  //   // overflow: 'auto',
  //   // Menambahkan properti CSS untuk kustomisasi thumb scroll
  //   scrollbarColor: 'darkgray lightgray', // Warna thumb dan track
  //   scrollbarWidth: 'thin', // Lebar thumb
  //   // Efek 3D pada thumb scroll
  //   // overflowY: 'scroll', // Memaksa thumb scroll tampil selalu
  //   // boxShadow: 'inset 0 0 6px rgba(0, 0, 0, 0.3)', // Efek 3D    
  // }} 
  />
  );
}
