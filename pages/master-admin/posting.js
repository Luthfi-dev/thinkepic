// pages/Masteradmin.js

import React from "react";
import Head from "next/head";
import { MasterAdminLayout } from "/src/components/MasterAdmin/MasterAdminLayout";
import MasterAdminPosting from "/src/Contents/MasterAdmin/MasterAdminPosting";

const pageMasterAdmin = () => {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Add Posting</title>
      </Head>

      <MasterAdminLayout>
        <MasterAdminPosting />
      </MasterAdminLayout>
    </>
  );
};

export default pageMasterAdmin;
