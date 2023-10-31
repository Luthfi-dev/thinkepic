// pages/login.js
import AuthMasterLogin from "@/components/AuthMaster/Login";
import AuthMasterLoginv2 from "@/components/AuthMaster/Loginv2";
import React from "react";
import { Helmet } from "react-helmet";

const PageKontak = () => {
  return (
    <div>
      <Helmet>
        <title>Login Penyetuju ThinkEpic</title>

        <meta
          name="description"
          content="Halaman login untuk para penyetuju thinkepic."
        />
        <meta name="keywords" content="login, penyetuju thinkepic" />
      </Helmet>
      ;{/* desktop */}
      <div className="d-none d-md-block">
        <AuthMasterLogin />
      </div>
      {/* mobile */}
      <div className="d-md-none">
        <AuthMasterLoginv2 />
      </div>
    </div>
  );
};

export default PageKontak;
