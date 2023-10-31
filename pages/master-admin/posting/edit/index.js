// pages/MasterAdmin.js

import React from "react";
import Head from "next/head";
import { MasterAdminLayout } from "/src/components/MasterAdmin/MasterAdminLayout";
import MasterAdminPostingEdit from "/src/Contents/MasterAdmin/MasterAdminPostingEdit";

const pageMasterAdmin = () => {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Edit Posting</title>
      </Head>

      <MasterAdminLayout>
        <MasterAdminPostingEdit />
      </MasterAdminLayout>
    </>
  );
};

export default pageMasterAdmin;
