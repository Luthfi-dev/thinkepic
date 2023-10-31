import React, { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";
import CryptoJS from "crypto-js";
import {
  GOOGLE_CLIENT_ID,
  SECRETKEY_TOKEN,
  cekMailApi,
  client_ID,
  reqTokenApi,
  signupApi,
  tenan_ID,
  myAppLink
} from "../../../utils/globals";
import "/public/assets/custom/login/index.scss";
// import configureAxios from "../../../pages/axios-config";
import { showDynamicAlert } from "@/Contents/showDynamicAlert";
import { useRouter } from "next/router";

// MS LOGIN
// import { useMsal } from "@azure/msal-react";
// import msalConfig from "../../../config/msalConfig";

const AuthLogin = () => {
  const [prosesSSOGg, setProsesSSOGg] = useState(false);
  const [statusSSO, setStatusSSO] = useState(false);

    const setCookie = (name, value, maxAge) => {
    document.cookie = `${name}=${value}; Max-Age=${maxAge}; Secure; SameSite=Strict; path=/`;
    };

    const router = useRouter();

    const [formData, setFormData] = useState({
      email: "",
      nama: "",
      password: "",
      confir_password: "",
      role: "admin",
      status: null,
    });

    const [formDataLogin, setFormDataLogin] = useState({
      email: "",
      nama: "",
      role: "admin",
      password: "",
      sso: statusSSO,
      status: null,
    });

    console.log(formData)
    console.log(formDataLogin)


  const handleChange = async (e) => {
    const { name, value } = e.target;
    // console.log("Input berubah:", name, value, formData);
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleChangeLogin = async (e) => {
    const { name, value } = e.target;
    // console.log("Input login:", name, value, formDataLogin);
    setFormDataLogin((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };


  const encryptData = (data, secretKey) => {
  const ciphertext = CryptoJS.AES.encrypt(JSON.stringify(data), secretKey).toString();
  return ciphertext;
};

const handleSetCookie = (name, value, duration) => {
  const secretKey = SECRETKEY_TOKEN;
  const encryptedValue = encryptData(value, secretKey);

  setCookie(name, encryptedValue, duration);
};

const handleSubmitLogin = async (event) => {
  // Cek apakah ada access_token dalam URL
  let urlSearchParams = null;

  if (typeof window !== "undefined") {
    // Jika kode sedang dijalankan di lingkungan browser
    urlSearchParams = window.location.hash.includes("access_token")
      ? new URLSearchParams(window.location.hash.substr(1))
      : null;
  }

  if(urlSearchParams === null){
    event.preventDefault();
  }
  showDynamicAlert("Loading..", "loading");

  try {
    const postData = {
      email: formDataLogin.email,
      password: formDataLogin.password,
      role: formDataLogin.role,
      status: formDataLogin.status,
    };

    // Lakukan permintaan POST ke URL
    const response = await axios.post(reqTokenApi, postData, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.status === 200) {
      showDynamicAlert("Login Sukses", "successTime");
      router.push("/routes/admin");
    }

    // Gunakan fungsi handleSetCookie untuk mengatur cookie
    handleSetCookie("accessTokenPic", response.data.accessToken, 30 * 24 * 60 * 60 * 1000);

    const response2 = await axios.post(reqTokenApi, postData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    // console.log("SSO status", statusSSO)
    if(statusSSO) {
      if(formDataLogin.password === "********"){
        showDynamicAlert(
          "Email Terdaftar, pastikan akunmu sebelumnya terdaftar dengan akun (SSO) ke dalam aplikasi dan pastikan akunmu telah (active)",
          "warning"
        );
        router.push("/auth/login");
        setStatusSSO(false)
      } 
      // else {
      //   showDynamicAlert(
      //     `Email sudah terdaftar dengan type akun manual, silahkan Login secara manual tanpa SSO`,
      //     "warning"
      //   );
      // }
    } else {
      showDynamicAlert(
        "Username atau password Salah, Periksa Kembali! Pastikan Juga Akun Kamu Active",
        "error"
      );
    }
    
  }
};

  const handleSubmit = async (event) => {
    event ? event.preventDefault() : null;
    showDynamicAlert("Loading..", "loading");

    // Validasi email menggunakan regex sederhana
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!emailPattern.test(formData.email)) {
      showDynamicAlert("Format email tidak valid", "warning");
      return;
    }

    // Validasi password minimal 6 karakter
    if (formData.password.length < 6) {
      showDynamicAlert("Password harus minimal 6 karakter", "warning");
      return;
    }

    // Validasi apakah password perulangan sama
    if (formData.password !== formData.confir_password) {
      showDynamicAlert(
        "Pengulangan Password Tidak Sama, Periksa Kembali",
        "warning"
      );
      return;
    }

    // Validasi bahwa semua kolom tidak kosong
    if (
      !formData.email ||
      !formData.nama ||
      !formData.password ||
      !formData.confir_password ||
      !formData.role
    ) {
      showDynamicAlert("Masih ada kolom yang belum terisi!", "warning");
      return;
    }

    const DataCek = `${cekMailApi}?email=${formData.email}&role=${formData.role}`;
    // console.log(DataCek);

    try {
      // Mengeksekusi permintaan GET dengan axios
      const response = await axios.get(DataCek);

      if (response.data.length > 0) {
        showDynamicAlert(
          `Email sudah terdaftar sebagai verifikator. Silahkan lakukan login.`,
          "warning"
        );
      } else {
        // console.log(response.data);

        if(statusSSO === false){
          // Data yang akan dikirimkan dalam permintaan POST
          const postData = {
            email: formData.email,
            nama: formData.nama,
            password: formData.password,
            role: formData.role,
            status: formData.status
          };

          // console.log("Data post", postData);

          if (response.data.length === 0) {
            // Lakukan permintaan POST ke URL
            const postResponse = await axios.post(signupApi, postData, {
              headers: {
                "Content-Type": "application/json",
              },
            });

            // console.log("Response dari server:", postResponse);

            // Handle respons di sini
            if (postResponse.status === 200) {
              // Data berhasil disimpan, lakukan tindakan yang sesuai
              showDynamicAlert(
                "Akun Berhasil di Daftarkan",
                "successTime"
              );
                window.location.href = `/auth/login/send-mail?email=${formData.email}`;
            } else {
              // Handle respons error dengan status lain jika diperlukan
              console.error(
                "Terjadi kesalahan pada server:",
                postResponse.data.message
              );
            }
          }
        }
      }
    } catch (error) {
      // Handle kesalahan jaringan atau lainnya
      console.error("Terjadi kesalahan:", error);
    }
  };

  const checkPasswordLength = () => {
    const passwordInput = document.getElementById("password");
    const confirmPasswordInput = document.getElementById("confirm_password");
    const notifPass = document.getElementById("notif_password");

    if (formData.password.length < 8) {
      passwordInput.style.border = "1px solid red";
      // alert("Password minimal 8 karakter");
      notifPass.innerHTML = "Password minimal 8 karakter";
    } else {
      passwordInput.style.border = "1px solid #ccc";
      notifPass.innerHTML = "";
    }

    // Juga periksa konfirmasi password jika diperlukan
    if (formData.confir_password.length < 8) {
      confirmPasswordInput.style.border = "1px solid red";
    } else {
      confirmPasswordInput.style.border = "1px solid #ccc";
    }
  };


  // bagian login
   const handleLoginMS = () => {
    // const clientID = "10a4c7e9-17dc-4f63-9849-a2b4e0929389"
    // const tenantID = "26ae6adf-61be-443f-8dc4-6531b61a9a38"
    const clientID = client_ID;
    const tenantID = tenan_ID; 
    const directURI = `${myAppLink}/auth/login`;
    const fullURL =
      "https://login.microsoftonline.com/" +
      tenantID +
      "/oauth2/v2.0/authorize?client_id=" +
      clientID +
      "&response_type=token&redirect_uri=" +
      directURI +
      "&response_mode=fragment&scope=openid profile";
    window.location.href = fullURL;
  };

  const handleLoginGoogle = () => {
    // const clientID = "943624068454-oo58hl2hh7ft9kv4m2t5l4fvslbq96ah.apps.googleusercontent.com";
    const clientID = GOOGLE_CLIENT_ID;
    const redirectURI = `${myAppLink}/auth/login`;
    const scope = "openid profile email";

    const fullURL = `https://accounts.google.com/o/oauth2/auth?client_id=${clientID}&redirect_uri=${redirectURI}&scope=${scope}&response_type=token`;

    window.location.href = fullURL;
  };


  const handleGoogleCallback = () => {
    const queryParams = new URLSearchParams(window.location.hash.substr(1)); // Ambil parameter dari URL hash
    const accessToken = queryParams.get("access_token");

    // Buat permintaan ke Google API untuk mendapatkan informasi pengguna
    fetch("https://www.googleapis.com/oauth2/v2/userinfo", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((response) => {
        if (response.status === 401) {
          throw new Error("Permintaan ke Google API tidak diotorisasi (401).");
        }
        return response.json();
      })
      .then((data) => {
        const { email, name } = data;
        formDataLogin.email = email; // Mengganti email dengan nilai yang baru
        formDataLogin.nama = name;
        formDataLogin.password = "********";
        formDataLogin.status = "active";
        // console.log("Email:", email);
        // console.log("Nama:", name);
        setFormDataLogin({ ...formDataLogin });
      })
      .catch((error) => {
        console.error(error);
        try {
          // Jika terjadi kesalahan dalam permintaan Google, coba dekode token JWT dari Microsoft
          const jwt = require('jsonwebtoken');
          const decodedToken = jwt.decode(accessToken);

          if (decodedToken) {
            const email = decodedToken.email;
            const name = decodedToken.name;

            formDataLogin.email = email;
            formDataLogin.nama = name;
            formDataLogin.password = "********";
            formDataLogin.status = "active";
            // console.log("Email (dari JWT):", email);
            // console.log("Nama (dari JWT):", name);
            setFormDataLogin({ ...formDataLogin });
          } else {
            throw new Error("Token JWT tidak valid");
          }
        } catch (error) {
          console.error(error);
          showDynamicAlert("Cara Login Kamu Tidak Valid", "error");
        }
      });
      // console.log(formDataLogin)
  };


  const awalan = () => {
    // Cek apakah ada access_token dalam URL
    let urlSearchParams = null;

    if (typeof window !== "undefined") {
      // Jika kode sedang dijalankan di lingkungan browser
      urlSearchParams = window.location.hash.includes("access_token")
        ? new URLSearchParams(window.location.hash.substr(1))
        : null;
    }

    if (urlSearchParams) {
      setStatusSSO(true);
      formDataLogin.sso = true;
    // Jika access_token ada, lakukan sesuatu
    handleGoogleCallback();
      // console.log("awalan")
    if (prosesSSOGg) {
      // cek mail apa sudah terdaftar
      const DataCek = `${cekMailApi}?email=${formDataLogin.email}&role=${formDataLogin.role}`;

      // Tambahkan async di sini
      (async () => {
        try {
          // Mengeksekusi permintaan GET dengan axios
          const response = await axios.get(DataCek);
          // console.log(response.data, DataCek);
          if (response.data.length > 0) {
            handleSubmitLogin();
          } else if (response.data.length === 0) {
            // Data yang akan dikirimkan dalam permintaan POST
            if(statusSSO === true){
                const postData = {
                email: formDataLogin.email,
                nama: formDataLogin.nama,
                password: formDataLogin.password,
                role: formDataLogin.role,
                status: formDataLogin.status,
              };

              // console.log("Data post", postData);

              if (response.data.length === 0) {
                // Lakukan permintaan POST ke URL
                const postResponse = await axios.post(signupApi, postData, {
                  headers: {
                    "Content-Type": "application/json",
                  },
                });

                // console.log("Response dari server:", postResponse);

                // Handle respons di sini
                if (postResponse.status === 200) {
                  // Data berhasil disimpan, lakukan tindakan yang sesuai
                  console.log(postResponse)
                  showDynamicAlert(
                    "Akun Berhasil di Daftarkan",
                    "success"
                  );
                  if(formDataLogin.password === "********") {
                    router.push("/routes/user");
                  } else {
                    window.location.href = `/auth/login/send-mail?email=${formData.email}`;
                  }
                } else {
                  // Handle respons error dengan status lain jika diperlukan
                  console.error(
                    "Terjadi kesalahan pada server:",
                    postResponse.data.message
                  );
                }
              }
            }
          } else {
            handleSubmitLogin();
          }
        } catch (error) {
          // Tangani kesalahan saat melakukan permintaan GET
          console.error("Kesalahan saat mengambil data:", error);
          // Lakukan sesuatu jika terjadi kesalahan
        }
      })();
    }
  } else {
    // Jika tidak ada access_token, lakukan sesuatu yang sesuai
    // console.log("Tidak ada access_token dalam URL.");
  }
}

  useEffect(()=>{
    awalan();
      console.log(statusSSO);

  },[])

    useEffect(()=>{
    awalan();
    setProsesSSOGg(true);
      console.log(statusSSO);

  },[formDataLogin.email])

  // END LOGIN WITH MS and google

  return (
    <>
      <div className="main">
        <div className="container a-container" id="a-container">
          <form className="form" id="a-form" method="" action="">
            <h2 className="form_title title">Create Account</h2>
            <div className="form__icons">
              <img
                className="form__icon"
                src="/assets/svg/logo-google.svg"
                width={50}
                height={50}
                objectFit="cover"
                alt="icon logo gmail"
                title="Sig Up with Gmail"
                style={{ width: "50px" }}
                onClick={() => {
                  handleLoginGoogle();
                }}
              />
              <img
                className="form__icon"
                src="/assets/svg/logo-ms.svg"
                width={50}
                height={50}
                objectFit="cover"
                alt="icon logo microsoft"
                title="Sig Up with Microsoft"
                style={{ width: "50px" }}
                onClick={() => {
                  handleLoginMS();
                }}
              />
            </div>
            <span className="form__span">or use email for registration</span>
            <input
              className="form__input"
              type="email"
              name="email"
              placeholder="Masukkan email"
              value={formData.email}
              onChange={handleChange}
            />
            <input
              className="form__input"
              type="text"
              name="nama"
              placeholder="Masukkan nama"
              value={formData.nama}
              onChange={handleChange}
            />
            <input
              className="form__input"
              type="password"
              name="password"
              id="password"
              placeholder="Masukkan password"
              value={formData.password}
              onChange={handleChange}
              onBlur={checkPasswordLength}
            />
            <span className="text-danger" id="notif_password"></span>
            <input
              className="form__input"
              type="password"
              name="confir_password"
              id="confirm_password"
              placeholder="Ulangi Password"
              value={formData.confir_password}
              onChange={handleChange}
              onBlur={checkPasswordLength}
            />

            <button
              className="form__button button submit"
              onClick={handleSubmit}
            >
              SIGN UP
            </button>
          </form>
        </div>
        <div className="container b-container" id="b-container">
          <form className="form" id="b-form" method="" action="">
            <h2 className="form_title title">Sign in to Website</h2>
            <div className="form__icons">
              <img
                className="form__icon"
                src="/assets/svg/logo-google.svg"
                width={50}
                height={50}
                objectFit="cover"
                alt="icon logo gmail sign in"
                title="Sign In with Gmail"
                style={{ width: "50px" }}
                onClick={() => {
                  handleLoginGoogle();
                }}
              />
              <img
                className="form__icon"
                src="/assets/svg/logo-ms.svg"
                width={50}
                height={50}
                objectFit="cover"
                alt="icon logo gmail  sign in"
                title="Sign In with Microsoft"
                style={{ width: "50px" }}
                onClick={() => {
                  handleLoginMS();
                }}
              />
            </div>
            <span className="form__span">or use your email account</span>
            <input
              className="form__input"
              type="text"
              placeholder="Email"
              name="email"
              value={formDataLogin.email}
              onChange={handleChangeLogin}
            />
            <input
              className="form__input"
              type="password"
              placeholder="Password"
              name="password"
              value={formDataLogin.password}
              onChange={handleChangeLogin}
            />

            <Link href="/auth/reset-password" className="form__link">
              Forgot your password?
            </Link>
            <button
              className="form__button button submit"
              onClick={handleSubmitLogin}
            >
              SIGN IN
            </button>
          </form>
        </div>
        <div className="switch" id="switch-cnt">
          <img
            className="switch__circle"
            src="/assets/svg/illustrasi-1.svg"
            alt="illustrasi login"
          />
          <img
            className="switch__circle switch__circle--t"
            src="/assets/svg/illustrasi-2.svg"
            style={{ margin: "90px", marginLeft: "-170px" }}
            alt="illustrasi login2"
          />
          <div className="switch__container" id="switch-c1">
            <img
              className=""
              width={150}
              src="/assets/svg/bg-1.svg"
              alt="illustrasi 3"
            />
            <h2 className="switch__title title">Welcome Back !</h2>
            <p className="switch__description description">
              To stay connected with us, kindly log in using your unique
              identification.
            </p>
            <button className="switch__button button switch-btn">
              SIGN IN
            </button>
          </div>
          <div className="switch__container is-hidden" id="switch-c2">
            <h2 className="switch__title title">
              {" "}
              <img
                className=""
                width={150}
                src="/assets/svg/bg-1.svg"
                alt="illustrasi 4"
              />
            </h2>
            <p className="switch__description description">
              Unlock access to our services by providing your personal details.
            </p>
            <button className="switch__button button switch-btn">
              SIGN UP
            </button>
          </div>
        </div>
        <script src="/assets/custom/login/login.js" async></script>
      </div>
    </>
  );
};

export default AuthLogin;
