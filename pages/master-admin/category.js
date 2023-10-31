// pages/admin.js

import React from "react";
import Head from "next/head";
import { AdminLayout } from "../../src/components/Admin/AdminLayout";
import AdminContent from "../../src/Contents/Admin/AdminContent";

const pageAdmin = () => {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Thinkepic CMS</title>
      </Head>

      <AdminLayout>
        <AdminContent />
      </AdminLayout>
    </>
  );
};

export default pageAdmin;
