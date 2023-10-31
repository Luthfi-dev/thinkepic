import axios from "axios";

// Buat instance Axios kustom
const fifiAxios = axios.create();

// Fungsi untuk mengatur token akses
const setAccessToken = (token) => {
  if (token) {
    fifiAxios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    // Hapus header otorisasi jika token tidak ada
    delete fifiAxios.defaults.headers.common["Authorization"];
  }
};

// Dapatkan semua cookie
const allCookies = document.cookie;

// Parse (urai) cookie menjadi objek
const cookiesArray = allCookies.split("; ");

// Inisialisasi variabel untuk menyimpan nilai cookie yang diinginkan
let accessTokenPicValue = null;

// Loop melalui array cookie
for (const cookie of cookiesArray) {
  const [name, value] = cookie.split("=");
  if (name === "accessTokenPic") {
    accessTokenPicValue = value;
    break;
  }
}

setAccessToken(accessTokenPicValue);

export default fifiAxios;
