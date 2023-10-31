import { showDynamicAlert } from "@/Contents/showDynamicAlert";
import Cookies from "js-cookie";
import Router from "next/router";
import CryptoJS from "crypto-js";
import jwt from "jsonwebtoken";

export function CheckAccessToken(roleAkses) {
  // Mengecek apakah token akses ada
  const accessToken = Cookies.get("accessTokenPic");

  if (!accessToken) {
    // Jika token tidak ada, arahkan pengguna ke halaman login
    showDynamicAlert(
      "Tidak Ada Sesi Login, Silahkan Login Terlebih Dahulu!",
      "errorTime"
    );
    Router.push("/auth/re-login");
    return false;
  }

  // Fungsi untuk mendekripsi token
  const decryptToken = (ciphertext, secretKey) => {
    const bytes = CryptoJS.AES.decrypt(ciphertext, secretKey);
    const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    return decryptedData;
  };
  const secretKey =
    "020bf63cbf793694ec956cc3673306c38eb75647738ee0e857f8c7b6d37e1498fd7fc27106263e90c331542a1a36955416bfa8f4e2c40f88d881a9b07700e48a";
  const nilaiToken = decryptToken(accessToken, secretKey);
  try {
    // Pisahkan token menjadi tiga bagian berdasarkan tanda titik (.)
    const hasildataUser = nilaiToken.split(".");
    // Mendecode teks Base64
    const decodedText = atob(hasildataUser[1]);
    const userToken = JSON.parse(decodedText);
    const userRole = userToken.role;
    if (userRole === roleAkses) {
      // Izinkan akses jika peran sesuai
      return true;
    } else {
      // Jika peran tidak sesuai, berikan pesan kesalahan
      showDynamicAlert("Akses Dilarang", "errorTime");
      Router.push(`/${userRole}`);
      // showDynamicAlert("loading", "loading");
      return false;
    }
  } catch (error) {
    // Tangani kesalahan validasi token
    console.error("Error validating JWT:", error);
    showDynamicAlert("Token tidak valid", "errorTime");
    // Router.push("/");
    return false;
  }
  // if(accessToken){
  //   // jika tokennya ada lakukan validasi dengan menggunakan jwt, apakah token sah
  //   // lakukan decode payload lalu ambil role
  //   // jika role === roleAkses maka berikan izin akses,
  //   // jika rolenya beda maka berikan alert
  //   showDynamicAlert("Akses Dilarang", "errorTime");
  //   Router.push("/");
  //   return;
  // }
}
