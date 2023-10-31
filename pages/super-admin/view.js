// pages/super-admin/view.js

import React from "react";
import Head from "next/head";
import { SuperAdminLayout } from "/src/components/SuperAdmin/SuperAdminLayout";
import SuperAdminView from "/src/Contents/SuperAdmin/SuperAdminView";

const pageSuperAdmin = () => {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>View Postingan</title>
      </Head>

      <SuperAdminLayout>
        <SuperAdminView />
      </SuperAdminLayout>
    </>
  );
};

export default pageSuperAdmin;
