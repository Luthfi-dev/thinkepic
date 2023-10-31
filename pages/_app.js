import { useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Head from "next/head";
import NextNProgress from "nextjs-progressbar";

// import { appWithTranslation } from "next-i18next";
// import { useTranslation } from "react-i18next";
// import i18n from "@/components/MyTranslate";
// import { Trans } from "react-i18next";

import "../public/assets/vendor/bootstrap/css/bootstrap.min.css";
import "../public/assets/vendor/bootstrap-icons/bootstrap-icons.css";
import "../public/assets/vendor/boxicons/css/boxicons.min.css";
import "../public/assets/vendor/quill/quill.snow.css";
import "../public/assets/vendor/quill/quill.bubble.css";
import "../public/assets/vendor/remixicon/remixicon.css";
import "../public/assets/vendor/simple-datatables/style.css";
import "../public/assets/css/warna.css";
// custom css
import "../public/assets/custom/font/myfont.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <NextNProgress
        color="#E73539"
        startPosition={0.3}
        stopDelayMs={1000}
        height={3}
      />
      {/* <Trans> */}
      <Component {...pageProps} />
      {/* </Trans> */}
    </>
  );
}

export default MyApp;
