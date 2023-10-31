// pages/axios-config.js
import axios from "axios";
import { useEffect } from "react";
import { useRouter } from "next/router";
import CryptoJS from "crypto-js";
import { showDynamicAlert } from "@/Contents/showDynamicAlert";

// Fungsi untuk mengatur token akses
const setAccessToken = (axiosInstance, token) => {
  if (token) {
    axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    // Hapus header otorisasi jika token tidak ada
    // delete axiosInstance.defaults.headers.common["Authorization"];
  }
};

// Fungsi untuk mendekripsi token
const decryptToken = (ciphertext, secretKey) => {
  const bytes = CryptoJS.AES.decrypt(ciphertext, secretKey);
  const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  return decryptedData;
};

// Fungsi kustom React Hook untuk konfigurasi Axios
export function useAxiosConfig() {
  const router = useRouter();
  const axiosInstance = axios.create();

  useEffect(() => {
    // Fungsi untuk menangani respons dari server
    const handleResponse = async (response) => {
      if (response === undefined) {
        router.push("/auth/re-login");
        return;
      }

      if (response.status === 403) {
        // Jika respons adalah Forbidden (403), tampilkan pesan akses ditolak
        showDynamicAlert("Akses Dilarang ke halaman ini!", "errorTime");
      } else if (response.status === 401) {
        // Jika respons adalah Unauthorized (401), tampilkan pesan sesi berakhir
        showDynamicAlert("Sesi Berakhir Silahkan Login Kembali!", "errorTime");
        router.push("/auth/re-login");
      }
    };

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

        if (accessTokenPicValue) {
          // Deskripsi token
          const secretKey =
            "020bf63cbf793694ec956cc3673306c38eb75647738ee0e857f8c7b6d37e1498fd7fc27106263e90c331542a1a36955416bfa8f4e2c40f88d881a9b07700e48a";
          const nilaiToken = decryptToken(accessTokenPicValue, secretKey);

          // Set token akses jika ada
          setAccessToken(axiosInstance, nilaiToken);
        }
      }
    }

    // Berlangganan untuk menangani respons di seluruh aplikasi
    axiosInstance.interceptors.response.use(
      (response) => {
        handleResponse(response);
        return response;
      },
      (error) => {
        handleResponse(error.response);
        throw error;
      }
    );
  }, [axiosInstance, router]);

  return axiosInstance;
}

// Ekspor default fungsi useAxiosConfig
export default useAxiosConfig;
