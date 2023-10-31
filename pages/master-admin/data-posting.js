// pages/Masteradmin.js

import React from "react";
import Head from "next/head";
import { MasterAdminLayout } from "/src/components/MasterAdmin/MasterAdminLayout";
import MasterDataPosting from "/src/Contents/MasterAdmin/MasterDataPosting";

const pageMasterAdmin = () => {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Data Posting</title>
      </Head>

      <MasterAdminLayout>
        <MasterDataPosting />
      </MasterAdminLayout>
    </>
  );
};

export default pageMasterAdmin;
