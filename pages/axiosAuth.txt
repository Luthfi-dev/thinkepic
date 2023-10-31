// axiosAuth.js

import axios from "axios";
import CryptoJS from "crypto-js";

const secretKey =
  "020bf63cbf793694ec956cc3673306c38eb75647738ee0e857f8c7b6d37e1498fd7fc27106263e90c331542a1a36955416bfa8f4e2c40f88d881a9b07700e48a";

// Fungsi untuk mengenkripsi data
const encryptData = (data, secretKey) => {
  const ciphertext = CryptoJS.AES.encrypt(
    JSON.stringify(data),
    secretKey
  ).toString();
  return ciphertext;
};

// Fungsi untuk mendekripsi data
const decryptData = (ciphertext, secretKey) => {
  const bytes = CryptoJS.AES.decrypt(ciphertext, secretKey);
  const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  return decryptedData;
};

export const addAccessTokenToRequest = (config) => {
  const access_token = localStorage.getItem("access_token_mpic");

  if (access_token) {
    // Mendekripsi access_token sebelum digunakan
    const decryptedAccessToken = decryptData(access_token, secretKey);

    // Tambahkan token ke header permintaan
    config.headers.Authorization = `Bearer ${decryptedAccessToken}`;
  }

  return config;
};
