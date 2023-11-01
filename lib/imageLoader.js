// lib/imageLoader.js

module.exports = function customImageLoader(props) {
  // Cek apakah properti loader sudah ada di tag Image
  if (props && !props.loader) {
    // Jika tidak ada, tambahkan properti loader
    props.loader = ({ src, width, quality }) => {
      return `${src}?w=${width}&q=${quality || 75}`;
    };
  }

  // Kembalikan objek yang berisi properti loader
  return props;
};
