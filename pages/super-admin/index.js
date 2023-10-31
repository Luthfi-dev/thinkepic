// pages/admin.js

import React from "react";
import Head from "next/head";
import { useEffect } from "react";
import { SuperAdminLayout } from "../../src/components/SuperAdmin/SuperAdminLayout";
import SuperAdminContent from "../../src/Contents/SuperAdmin/SuperAdminContent";
import { CheckAccessToken } from "@/components/verifHakAkses";

const PageSuperAdmin = () => {
  useEffect(() => {
    // Memeriksa keberadaan token akses sebelum mengizinkan akses ke halaman ini
    const hcek = CheckAccessToken("super-admin");
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

      <SuperAdminLayout>
        <SuperAdminContent />
      </SuperAdminLayout>
    </>
  );
};

export default PageSuperAdmin;
