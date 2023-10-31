// pages/admin.js

import React from "react";
import Head from "next/head";
import { SuperAdminLayout } from "/src/components/SuperAdmin/SuperAdminLayout";
import SuperAdminVerifikasi from "/src/Contents/SuperAdmin/SuperAdminVerifikasi";

const pageSuperAdmin = () => {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Verifikasi Postingan</title>
      </Head>

      <SuperAdminLayout>
        <SuperAdminVerifikasi />
      </SuperAdminLayout>
    </>
  );
};

export default pageSuperAdmin;
