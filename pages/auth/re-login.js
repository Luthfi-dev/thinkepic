import { useEffect } from "react";
import { useRouter } from "next/router";

const ReLogin = () => {
  const router = useRouter();

  useEffect(() => {
    // Cek apakah kode dijalankan di sisi klien (browser)
    if (typeof window !== "undefined") {
      // Redirect ke halaman login di sisi klien
      window.location.href = "/auth/login";
    } else {
      // Jika dijalankan di sisi server, gunakan Next.js router untuk mengarahkan pengguna
      router.push("/auth/login");
    }
  }, [router]);

  return null; // Komponen ini tidak memiliki tampilan, sehingga return null
};

export default ReLogin;
