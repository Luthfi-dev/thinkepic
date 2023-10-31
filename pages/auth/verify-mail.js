// pages/login.js
import React from "react";
import Image from "next/image";
import { UserLayout } from "@/components/User/UserLayout";
import Link from "next/link";

const sendMail = () => {
  return (
    <UserLayout>
      <div className="container col-md-4" style={{ marginTop: "200px" }}>
        <Image
          src="/assets/svg/mail-success.svg"
          alt="Foto A"
          width={0}
          height={0}
          layout="responsive"
        />
        <div className="row mt-3">
          <center>
            <button
              className="btn btn-app"
              style={{ zIndex: "99", width: "200px", marginTop: "-200px" }}
            >
              Email Berhasil di verifikasi
            </button>
            <br />
            <Link href="/auth/re-login" className="btn btn-app">
              Login Sekarang
            </Link>
          </center>
        </div>
      </div>
    </UserLayout>
  );
};

export default sendMail;
