// lib/imageLoader.js

import { Image } from "next/image";

export function customImageLoader(props) {
  // Cek apakah properti loader sudah ada di tag Image
  if (props && !props.loader) {
    // Jika tidak ada, tambahkan properti loader
    props.loader = ({ src, width, quality }) => {
      return `${src}?w=${width}&q=${quality || 75}`;
    };
  }

  // Kembalikan komponen Image dengan loader yang sudah ditambahkan jika perlu
  return <Image {...props} />;
}
