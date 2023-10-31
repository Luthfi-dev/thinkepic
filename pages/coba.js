import React, { useEffect } from "react";
import axios from "axios";

const PostData = () => {
  useEffect(() => {
    // Data yang akan dikirim dalam permintaan POST
    const postData = {
      // Isi data yang ingin Anda kirim di sini
      // Contoh: name, email, dll.
    };

    // Header yang ingin Anda atur (sesuaikan dengan kebutuhan Anda)
    const headers = {
      // "Content-Type": "application/json", // Contoh: Tipe konten yang dikirim
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZF91c2VyIjo5NywiZW1haWwiOiJmaWlsdXQ1QGdtYWlsLmNvbSIsIm5hbWEiOiJmaWZpIiwicm9sZSI6InVzZXIiLCJpYXQiOjE2OTQ1MDM0NjIsImV4cCI6MTY5NDUwNzA2Mn0.l0dLwqOlwdrNuj3YtXADzkKAkwz_HgjGE1LMCFgju6Y",
    };

    // URL endpoint yang akan menerima permintaan POST
    const apiUrl = "http://localhost:9000/user/refresh";

    // Lakukan permintaan POST menggunakan Axios
    axios
      .get(apiUrl, { headers })
      .then((response) => {
        // Tangani respons di sini
        console.log("Respons dari server:", response.data);
      })
      .catch((error) => {
        // Tangani kesalahan jika terjadi
        console.error("Terjadi kesalahan:", error);
      });
  }, []);

  return (
    <div>
      <h1>Halaman POST Data</h1>
      {/* Tambahkan konten halaman jika diperlukan */}
    </div>
  );
};

export default PostData;
