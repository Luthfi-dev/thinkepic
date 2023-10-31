import { useEffect } from "react";
import Router from "next/router";
import Cookies from "js-cookie";
import { showDynamicAlert } from "@/Contents/showDynamicAlert";

const Logout = () => {
  useEffect(() => {
    // Hapus cookie "accessTokenPic"
    Cookies.remove("accessTokenPic");

    // Tampilkan pesan bahwa logout berhasil
    showDynamicAlert("Logout Berhasil.", "successTime");

    // Arahkan pengguna kembali ke halaman "roo/re-login"
    Router.push("/auth/re-login");
  }, []);

  return null;
};

export default Logout;
