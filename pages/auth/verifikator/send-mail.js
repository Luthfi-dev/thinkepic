// pages/login.js
import React from "react";
import Image from "next/image";
import { UserLayout } from "@/components/User/UserLayout";
import { useRouter } from "next/router";

const SendMail = () => {
  const router = useRouter();
  const { email } = router.query;
  return (
    <UserLayout>
      <div className="container col-md-4">
        <Image
          src="/assets/svg/send_letter.svg"
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
              Kami Telah Mengirimkan Email Verifikasi
              <br />
              ke {email}
            </button>
          </center>
        </div>
      </div>
    </UserLayout>
  );
};

export default SendMail;
