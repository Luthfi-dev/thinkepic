// pages/login.js
import AuthLogin from "@/components/Auth/Login";
import AuthLoginv2 from "@/components/Auth/Loginv2";
import React from "react";
import { Helmet } from "react-helmet";

const PageKontak = () => {
  return (
    <div>
      <Helmet>
        <title>Login Penulis ThinkEpic</title>

        <meta
          name="description"
          content="Halaman login untuk para penulis/kontributor thinkepic."
        />
        <meta name="keywords" content="login, penulis/kontributor thinkepic" />
      </Helmet>
      ;{/* desktop */}
      <div className="d-none d-md-block">
        <AuthLogin />
      </div>
      {/* mobile */}
      <div className="d-md-none">
        <AuthLoginv2 />
      </div>
    </div>
  );
};

export default PageKontak;
