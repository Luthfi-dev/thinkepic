// Contoh: src/components/LayoutTemplate.js
import React from "react";

const LayoutTemplate = ({ children }) => {
  return (
    <div>
      <header>{/* Header content */}</header>
      <main>{children}</main>
      <footer>{/* Footer content */}</footer>
    </div>
  );
};

export default LayoutTemplate;
