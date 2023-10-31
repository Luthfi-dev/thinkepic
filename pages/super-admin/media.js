// pages/media.js

import React from "react";
import Head from "next/head";
import { SuperAdminLayout } from "/src/components/SuperAdmin/SuperAdminLayout";
import AdminMedia from "/src/Contents/SuperAdmin/SuperAdminMedia";

const pageAdmin = () => {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Media Library</title>
      </Head>

      <SuperAdminLayout>
        <AdminMedia />
      </SuperAdminLayout>
    </>
  );
};

export default pageAdmin;
