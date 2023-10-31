
import React from "react";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';

import { artikelUser,publicApi } from "../../../utils/globals";

const SectionArtikelFoto = () => {
  const router = useRouter();
    const [dataAll, setDataAll] = useState([]);


  async function fetchData() {
       try {
      const response = await axios.get(`${artikelUser}`, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        console.log("ini dattaaaaa", response);
      const data = response.data;
      const postinganTeratas = data.data;
      setDataAll(postinganTeratas);
    } catch (error) {
      console.error("Terjadi kesalahan saat mengambil data dari API:", error);
    }
  }

   function filterHTMLTags(text) {
  // Menghilangkan tag HTML menggunakan regex
  return text.replace(/<\/?[^>]+(>|$)/g, "");
}

  useEffect(() => {
    fetchData();
  },[]);

    // Fungsi untuk menghasilkan elemen-elemen JSX dari dataAll
const renderDataAll = (dataAll) => {
  return dataAll.map((item, index) => {
    const { id,media, judul, isi } = item;

    // Mendapatkan ekstensi file foto dari nama file
    const fotoEkstensi = media ? media.split(".").pop().toLowerCase() : "";

    // Menentukan apakah ekstensi adalah gambar atau video
    const isImage = ["jpg", "jpeg", "png", "gif"].includes(fotoEkstensi);
    
    return (
      <div className="post-item clearfix" key={index}>
        <Link href={`admin/view/${id}`}>
        {media ? (
          // Jika media terisi, lakukan pengecekan jenis media
          isImage ? (
            // Jika ekstensi adalah gambar, tampilkan gambar dari publicApi
            <Image
              width={100}
              height={80}
              objectFit="contain"
              src={`${publicApi}/${media}`}
              alt="foto thunbnail"
            />
          ) : (
            // Jika ekstensi bukan gambar, tampilkan thumbnail video dari path yang sesuai
            <Image
              width={100}
              height={80}
              objectFit="contain"
              src={`${publicApi}/default/thum_video.png`}
              alt="video  thunbnail"
            />
          )
        ) : (
          // Jika media kosong, tampilkan gambar baru
          <Image
            width={100}
            height={50}
            objectFit="contain"
            src={`${publicApi}/default/no_picture.png`}
            alt="foto thunbnail no image"
          />
        )}
        <h4>
        {judul}
        </h4>
        <p className="text-app">
          {isi.length > 50
            ? `${filterHTMLTags(isi).substring(0, 50)}...`
            : filterHTMLTags(isi)}
        </p>
        </Link>
      </div>
      
    );
  });
};

  return (
      <div className="row">
        <div className="col-xxl-8 col-md-8">
            <div className="card p-2">
              <h5 className="card-title p-2">Postingan <span>| Terbaru</span></h5>

              <div className="news m-2">
                {renderDataAll(dataAll)}
              </div>

              <div className="row mt-3">
                <center>
                  <Link href="/admin/data-posting"><button className="btn btn-app btn-sm">semua artikel <i className="bi bi-arrow-right"></i></button></Link>
                </center>
              </div>
              {/* <!-- End sidebar recent posts--> */}

            </div>
          </div>
    </div>
  );
};

export default SectionArtikelFoto;
