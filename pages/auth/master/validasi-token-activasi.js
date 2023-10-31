// pages/login.js
import React from "react";
import Image from "next/image";
import { UserLayout } from "@/components/User/UserLayout";
import { useRouter, useEffect } from "next/router";
import Link from "next/link";
import axios from "axios";
import { verifyMailApi } from "../../../utils/globals";

const SendMail = () => {
  const router = useRouter();
  const { token } = router.query;
  console.log(token);

  if (token) {
    // Gunakan token dari destruksi di atas
    axios
      .post(verifyMailApi, null, {
        headers: {
          token: token,
        },
      })
      .then((response) => {
        router.push("/auth/verify-mail");
      })
      .catch((error) => {
        console.error("Terjadi kesalahan:", error);
      });
  }
};

export default SendMail;
