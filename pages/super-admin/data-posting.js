// pages/Superadmin.js

import React from "react";
import Head from "next/head";
import { SuperAdminLayout } from "/src/components/SuperAdmin/SuperAdminLayout";
import SuperDataPosting from "/src/Contents/SuperAdmin/SuperDataPosting";

const pageSuperAdmin = () => {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Data Posting</title>
      </Head>

      <SuperAdminLayout>
        <SuperDataPosting />
      </SuperAdminLayout>
    </>
  );
};

export default pageSuperAdmin;
