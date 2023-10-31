// AdminContentProses.js

import React, { useState, useEffect } from "react";
const axios = require("axios");
import { artikelApi, artikelPageApi } from "../../../../utils/globals";

const DataPostingProses = () => {
  // Fungsi untuk mengambil data dari API berdasarkan judul
  async function fetchDataFromApi(judul) {
    try {
      const response = await axios.get(artikelApi);
      const data = response.data;
    } catch (error) {
      console.error("Terjadi kesalahan saat mengambil data dari API:", error);
      // Handle kesalahan sesuai kebutuhan Anda
    }
  }

  return <></>;
};

export default DataPostingProses;
