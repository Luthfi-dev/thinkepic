// pages/admin.js

import React from "react";
import Head from "next/head";
import { useEffect } from "react";
import { MasterAdminLayout } from "../../src/components/MasterAdmin/MasterAdminLayout";
import MasterAdminContent from "../../src/Contents/MasterAdmin/MasterAdminContent";
import { CheckAccessToken } from "@/components/verifHakAkses";

const PageMasterAdmin = () => {
  useEffect(() => {
    // Memeriksa keberadaan token akses sebelum mengizinkan akses ke halaman ini
    const hcek = CheckAccessToken("master-admin");
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

      <MasterAdminLayout>
        <MasterAdminContent />
      </MasterAdminLayout>
    </>
  );
};

export default PageMasterAdmin;
