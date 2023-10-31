// pages/admin.js

import React from "react";
import Head from "next/head";
import { MasterAdminLayout } from "/src/components/MasterAdmin/MasterAdminLayout";
import MasterAdminVerifikasi from "/src/Contents/MasterAdmin/MasterAdminVerifikasi";

const pageMasterAdmin = () => {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Verifikasi Postingan</title>
      </Head>

      <MasterAdminLayout>
        <MasterAdminVerifikasi />
      </MasterAdminLayout>
    </>
  );
};

export default pageMasterAdmin;
