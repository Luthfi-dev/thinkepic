// pages/media.js

import React from "react";
import Head from "next/head";
import { AdminLayout } from "/src/components/Admin/AdminLayout";
import AdminMedia from "/src/Contents/Admin/AdminMedia";

const pageAdmin = () => {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Media Library</title>
      </Head>

      <AdminLayout>
        <AdminMedia />
      </AdminLayout>
    </>
  );
};

export default pageAdmin;
