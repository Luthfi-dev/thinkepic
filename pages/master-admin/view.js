// pages/super-admin/view.js

import React from "react";
import Head from "next/head";
import { MasterAdminLayout } from "/src/components/MasterAdmin/MasterAdminLayout";
import MasterAdminView from "/src/Contents/MasterAdmin/MasterAdminView";

const pageMasterAdmin = () => {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>View Postingan</title>
      </Head>

      <MasterAdminLayout>
        <MasterAdminView />
      </MasterAdminLayout>
    </>
  );
};

export default pageMasterAdmin;
