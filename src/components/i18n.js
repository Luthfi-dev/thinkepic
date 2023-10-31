import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// Objek yang berisi kata/frasa yang ingin diganti dan terjemahannya
const customTranslations = {
  "mau makan": "i want eat",
  "kata/frasa lain": "terjemahan lain",
  // Tambahkan lebih banyak kata/frasa di sini
};

const customPostProcessor = {
  postProcess: (value, key, options) => {
    // Melakukan penggantian teks berdasarkan daftar customTranslations
    if (key === "translation") {
      for (const [phrase, translation] of Object.entries(customTranslations)) {
        value = value.replace(phrase, translation);
      }
    }
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
          // ...
        },
      },
      en: {
        translation: {
          // ...
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
