// pages/admin.js

import React from "react";
import Head from "next/head";
import { AdminLayout } from "/src/components/Admin/AdminLayout";
import AdminPosting from "/src/Contents/Admin/AdminPosting";

const pageAdmin = () => {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Add Posting</title>
      </Head>

      <AdminLayout>
        <AdminPosting />
      </AdminLayout>
    </>
  );
};

export default pageAdmin;
