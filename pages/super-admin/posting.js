// pages/Superadmin.js

import React from "react";
import Head from "next/head";
import { SuperAdminLayout } from "/src/components/SuperAdmin/SuperAdminLayout";
import SuperAdminPosting from "/src/Contents/SuperAdmin/SuperAdminPosting";

const pageSuperAdmin = () => {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Add Posting</title>
      </Head>

      <SuperAdminLayout>
        <SuperAdminPosting />
      </SuperAdminLayout>
    </>
  );
};

export default pageSuperAdmin;
