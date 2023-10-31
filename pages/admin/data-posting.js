// pages/admin.js

import React from "react";
import Head from "next/head";
import { AdminLayout } from "/src/components/Admin/AdminLayout";
import DataPosting from "/src/Contents/Admin/DataPosting";

const pageAdmin = () => {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Data Posting</title>
      </Head>

      <AdminLayout>
        <DataPosting />
      </AdminLayout>
    </>
  );
};

export default pageAdmin;
