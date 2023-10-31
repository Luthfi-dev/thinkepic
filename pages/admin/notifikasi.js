// pages/notifikasi.js

import React from "react";
import Head from "next/head";
import { AdminLayout } from "../../src/components/Admin/AdminLayout";
import AdminViewNotifikasi from "../../src/Contents/Admin/AdminViewNotifikasi";

const pageAdmin = () => {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Notifikasi Thinkepic</title>
      </Head>

      <AdminLayout>
        <AdminViewNotifikasi />
      </AdminLayout>
    </>
  );
};

export default pageAdmin;
