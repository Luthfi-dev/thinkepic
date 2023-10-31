// pages/notifikasi.js

import React from "react";
import Head from "next/head";
import { SuperAdminLayout } from "../../src/components/SuperAdmin/SuperAdminLayout";
import SuperAdminViewNotifikasi from "../../src/Contents/SuperAdmin/SuperAdminViewNotifikasi";

const pageSuperAdmin = () => {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Notifikasi Thinkepic</title>
      </Head>

      <SuperAdminLayout>
        <SuperAdminViewNotifikasi />
      </SuperAdminLayout>
    </>
  );
};

export default pageSuperAdmin;
