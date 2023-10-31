// pages/login.js
import AuthAdminLogin from "@/components/AuthAdmin/Login";
import AuthAdminLoginv2 from "@/components/AuthAdmin/Loginv2";
import React from "react";
import { Helmet } from "react-helmet";

const PageKontak = () => {
  return (
    <div>
      <Helmet>
        <title>Login verifikator ThinkEpic</title>

        <meta
          name="description"
          content="Halaman login untuk para verifikator thinkepic."
        />
        <meta name="keywords" content="login, verifikator thinkepic" />
      </Helmet>
      ;{/* desktop */}
      <div className="d-none d-md-block">
        <AuthAdminLogin />
      </div>
      {/* mobile */}
      <div className="d-md-none">
        <AuthAdminLoginv2 />
      </div>
    </div>
  );
};

export default PageKontak;
