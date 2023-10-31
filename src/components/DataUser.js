import { useEffect, useState } from "react";
import jwt from "jsonwebtoken";
import CryptoJS from "crypto-js";

export function DataUser() {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      // Dapatkan semua cookie jika dijalankan di sisi klien
      const allCookies = document.cookie || "";

      if (allCookies) {
        // Parse (urai) cookie menjadi objek
        const cookiesArray = allCookies.split("; ");

        // Inisialisasi variabel untuk menyimpan nilai cookie yang diinginkan
        let accessTokenPicValue = null;

        // Loop melalui array cookie
        for (const cookie of cookiesArray) {
          const [name, value] = cookie.split("=");
          if (name.trim() === "accessTokenPic") {
            accessTokenPicValue = value;
            break;
          }
        }

        // deskripsi token
        // Fungsi untuk mendekripsi data
        const secretKey =
          "020bf63cbf793694ec956cc3673306c38eb75647738ee0e857f8c7b6d37e1498fd7fc27106263e90c331542a1a36955416bfa8f4e2c40f88d881a9b07700e48a";
        const decryptData = (ciphertext, secretKey) => {
          const bytes = CryptoJS.AES.decrypt(ciphertext, secretKey);
          const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
          return decryptedData;
        };

        const nilaiToken = decryptData(accessTokenPicValue, secretKey);

        const decodedToken = jwt.decode(nilaiToken);
        setUserData(decodedToken);
      }
    }
  }, []);

  return userData; // Kembalikan userData sehingga dapat diakses dari halaman lain
}
