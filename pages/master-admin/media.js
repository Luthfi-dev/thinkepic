// pages/media.js

import React from "react";
import Head from "next/head";
import { MasterAdminLayout } from "/src/components/MasterAdmin/MasterAdminLayout";
import AdminMedia from "/src/Contents/MasterAdmin/MasterAdminMedia";

const pageAdmin = () => {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Media Library</title>
      </Head>

      <MasterAdminLayout>
        <AdminMedia />
      </MasterAdminLayout>
    </>
  );
};

export default pageAdmin;
