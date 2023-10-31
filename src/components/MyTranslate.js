import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// Objek post-processor custom yang sesuai dengan spesifikasi i18next
const customPostProcessor = {
  type: "postProcessor",
  name: "customPostProcessor",
  process: (value, key, options, translator) => {
    // Lakukan penggantian teks kustom di sini
    // ...
    return value;
  },
};

i18n
  .use(initReactI18next)
  .use(customPostProcessor) // Menambahkan post-processor custom
  .init({
    resources: {
      id: {
        translation: {
          // Terjemahan bahasa Indonesia
          Artikels: "homhay",
        },
      },
      en: {
        translation: {
          // Terjemahan bahasa Inggris
          Artikels: "homhay",
        },
      },
    },
    lng: "id",
    fallbackLng: "en",
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
