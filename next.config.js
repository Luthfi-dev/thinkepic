// // next.config.js

const imageLoader = ({ src, width, quality }) => {
  return `${src}?w=${width}&q=${quality || 75}`;
};

module.exports = {
  images: {
    domains: ["thinkepic.id"],
    loader: imageLoader,
  },
};
