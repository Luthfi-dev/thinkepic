// pages/Superadmin.js

import React from "react";
import Head from "next/head";
import { SuperAdminLayout } from "/src/components/SuperAdmin/SuperAdminLayout";
import SuperAdminPostingEdit from "/src/Contents/SuperAdmin/SuperAdminPostingEdit";

const pageSuperAdmin = () => {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Edit Posting</title>
      </Head>

      <SuperAdminLayout>
        <SuperAdminPostingEdit />
      </SuperAdminLayout>
    </>
  );
};

export default pageSuperAdmin;
