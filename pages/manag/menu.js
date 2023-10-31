// pages/login.js
import React from "react";
import { Helmet } from "react-helmet";
import MenuManagement from "@/components/Manag/Menusite";

const Menu = () => {
  return (
    <div>
      <Helmet>
        <title>Manag Menus</title>

        <meta
          name="description"
          content="Halaman login untuk para penulis/kontributor thinkepic."
        />
        <meta name="keywords" content="login, penulis/kontributor thinkepic" />
      </Helmet>
      {/* desktop */}
      <MenuManagement />
    </div>
  );
};

export default Menu;
