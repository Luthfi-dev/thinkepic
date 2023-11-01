// next.config.js
// const { customImageLoader } = require("./lib/imageLoader");

module.exports = {
  images: {
    // loader: customImageLoader, // Menggunakan customImageLoader sebagai loader
    domains: ["thinkepic.id"],
  },
  // async headers() {
  //   return [
  //     {
  //       source: "/(.*)",
  //       headers: [
  //         {
  //           key: "Content-Security-Policy",
  //           value: "default-src 'self'; script-src 'none'; sandbox;",
  //         },
  //       ],
  //     },
  //   ];
  // },
  // webpack: (config) => {
  //   config.module.rules.push({
  //     test: /imageLoader\.js/,
  //     use: [
  //       {
  //         loader: "url-loader",
  //       },
  //     ],
  //   });
  //   return config;
  // },
};
