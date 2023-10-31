// pages/super-admin/view.js

import React from "react";
import Head from "next/head";
import { AdminLayout } from "/src/components/Admin/AdminLayout";
import AdminViewArtikel from "/src/Contents/Admin/AdminViewArtikel";

const pageAdmin = () => {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>View Postingan</title>
      </Head>

      <AdminLayout>
        <AdminViewArtikel />
      </AdminLayout>
    </>
  );
};

export default pageAdmin;
