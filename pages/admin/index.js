// pages/admin.js

import React from "react";
import Head from "next/head";
import { AdminLayout } from "../../src/components/Admin/AdminLayout";
import AdminContent from "../../src/Contents/Admin/AdminContent";

import { useEffect } from "react";
import { CheckAccessToken } from "@/components/verifHakAkses";
import { showDynamicAlert } from "@/Contents/showDynamicAlert";

const PageAdmin = () => {
  useEffect(() => {
    // Memeriksa keberadaan token akses sebelum mengizinkan akses ke halaman ini
    const hcek = CheckAccessToken("admin");
    if (!hcek) {
      return;
    }
  }, []);

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Thinkepic CMS</title>
      </Head>

      <AdminLayout>
        <AdminContent />
      </AdminLayout>
    </>
  );
};

export default PageAdmin;
