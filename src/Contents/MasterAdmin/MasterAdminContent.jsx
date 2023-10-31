// pages/admin.js
import Image from "next/image";
import React, { useState, useEffect }  from "react";
import { artikelPageApi, publicApi } from "../../../utils/globals";
import axios from "axios";
import Link from "next/link";
import configureAxios from "../../../pages/axios-config";
import { DataUser } from "@/components/DataUser";

const MasterAdminContent = () => {
    const [dataAll, setDataAll] = useState([]);
    const [dataAllActivity, setDataAllActivity] = useState([]);
    const [jumlahProses, setJumlahProses] = useState(0);
    const [jumlahDiterima, setJumlahDiterima] = useState(0);
    const [jumlahDitolak, setJumlahDitolak] = useState(0);

    const fifiAxios = configureAxios();
    const myUser = DataUser();
    const UserId = myUser !== null ? myUser.id_user : null;

   async function fetchData() {
      if (myUser !== null) {
        try {
          console.log(UserId);
          const response1 = await fifiAxios.get(`${artikelPageApi}?jumlah=3&status=proses&id_user=${UserId}`, {
            headers: {
              "Content-Type": "application/json",
            },
          });
          const response2 = await fifiAxios.get(`${artikelPageApi}?jumlah=3&status=pra-terima&id_user=${UserId}`, {
            headers: {
              "Content-Type": "application/json",
            },
          });
          const response3 = await fifiAxios.get(`${artikelPageApi}?jumlah=2&status=diterima&id_user=${UserId}`, {
            headers: {
              "Content-Type": "application/json",
            },
          });
          console.log(response1);

          const data1 = response1.data.data;
          const data2 = response2.data.data;
          const data3 = response3.data.data;

          const postinganTeratas = [...data1, ...data2, ...data3];

          setDataAll(postinganTeratas);
        } catch (error) {
          console.error("Terjadi kesalahan saat mengambil data dari API:", error);
        }
      }
  }

 
  // data untuk log activity
  async function fetchDataActivity() {
    if(myUser !== null){
      try {
      const response = await fifiAxios.get(
        `${artikelPageApi}?jumlah=10&id_user=${UserId}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = response.data;
      const postinganTeratas = data.data;
      setDataAllActivity(postinganTeratas);
    } catch (error) {
      console.error("Terjadi kesalahan saat mengambil data dari API:", error);
    }
    }
  }

  async function fetchDataStatus() {
    if(myUser !== null){
    // Fetch data for jumlahProses
    const prosesCount = await jumlahStatus("proses");
    setJumlahProses(prosesCount);

    // Fetch data for jumlahDiterima
    const diterimaCount = await jumlahStatus("diterima");
    setJumlahDiterima(diterimaCount);

    // Fetch data for jumlahDitolak
    const ditolakCount = await jumlahStatus("ditolak");
    setJumlahDitolak(ditolakCount);
    }

  }

  // async function jumlahStatus(status) {
  //   const response = await fifiAxios.get(`${artikelPageApi}?status=${status}`, {
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   });
  //   return response.data.total;
  // }

  // fungsi untuk menampilkan status proses,diterima dan ditolak
 async function jumlahStatus(status) {
  const response = await fifiAxios.get(`${artikelPageApi}?status=${status}&id_user=${UserId}`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.data.total;
}
  
  useEffect(() => {
    fetchData();
    fetchDataActivity();
    fetchDataStatus();
  }, [myUser]);

  function filterHTMLTags(text) {
  // Menghilangkan tag HTML menggunakan regex
  return text.replace(/<\/?[^>]+(>|$)/g, "");
}

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

 // Fungsi untuk menampilkan satu satu data aktivity
const renderDataAllActivity = (dataAllActivity) => {
 // Lakukan perulangan dengan nomor indeks
  dataAllActivity.forEach((activity, index) => {
    // Anda dapat mengakses properti status dan nomor indeks di sini
    const status = activity.status;
    
    // Lakukan sesuatu dengan status dan nomor indeks, misalnya mencetaknya ke konsol
    // console.log(`Status ke-${index}: ${status}`);
  });
};

renderDataAllActivity(dataAllActivity)

  return (
    <>
    <div className="pagetitle">
          <h1>Dashboard</h1>
          <nav>
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <a href="index.html">Home</a>
              </li>
              <li className="breadcrumb-item active">Dashboard</li>
            </ol>
          </nav>
      </div>

      <div className="row">
        <div className="col-xxl-4 col-md-6">
          <div className="card info-card sales-card">
            <div className="filter">
              <a className="icon" href="#" data-bs-toggle="dropdown">
                <i className="bi bi-three-dots"></i>
              </a>
              
            </div>

            <div className="card-body">
              <h5 className="card-title">
                Submit <span>| Proses</span>
              </h5>

              <div className="d-flex align-items-center">
                <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                  <i className="bi bi-clock-history"></i>
                </div>
                <div className="ps-3">
                  <h6>{jumlahProses}</h6>
                  <span className="text-success small pt-1 fw-bold">Postingan</span>{" "}
                  <span className="text-muted small pt-2 ps-1">Diproses</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-xxl-4 col-md-6">
          <div className="card info-card sales-card">
            <div className="filter">
              <a className="icon" href="#" data-bs-toggle="dropdown">
                <i className="bi bi-three-dots"></i>
              </a>
              
            </div>

            <div className="card-body">
              <h5 className="card-title">
                Submit <span>| Diterima</span>
              </h5>

              <div className="d-flex align-items-center">
                <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                  <i className="bi bi-clipboard-check"></i>
                </div>
                <div className="ps-3">
                  <h6>{jumlahDiterima}</h6>
                  <span className="text-success small pt-1 fw-bold">Postingan</span>{" "}
                  <span className="text-muted small pt-2 ps-1">Diterima</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-xxl-4 col-md-6">
          <div className="card info-card sales-card">
            <div className="filter">
              <a className="icon" href="#" data-bs-toggle="dropdown">
                <i className="bi bi-three-dots"></i>
              </a>
              
            </div>

            <div className="card-body">
              <h5 className="card-title">
                Submit <span>| Ditolak</span>
              </h5>

              <div className="d-flex align-items-center">
                <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                  <i className="bi bi-clipboard-x"></i>
                </div>
                <div className="ps-3">
                  <h6>{jumlahDitolak}</h6>
                  <span className="text-success small pt-1 fw-bold">Postingan</span>{" "}
                  <span className="text-muted small pt-2 ps-1">Ditolak</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        
      </div>
      <section>
        <div className="row">
          <div className="col-xxl-8 col-md-8">
            <div className="card p-2">
              <h5 className="card-title p-2">Postingan <span>| Terbaru</span></h5>

              <div className="news m-2">
                {renderDataAll(dataAll)}
              </div>

              <div className="row mt-3">
                <center>
                  <Link href="/master-admin/data-posting"><button className="btn btn-app btn-sm">semua artikel <i className="bi bi-arrow-right"></i></button></Link>
                </center>
              </div>
              {/* <!-- End sidebar recent posts--> */}

            </div>
          </div>
          <div className="col-xxl-4 col-md-4">
            <div className="card">
            {/* <div className="filter">
              <a className="icon" href="#" data-bs-toggle="dropdown"><i className="bi bi-three-dots"></i></a>
              <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
                <li className="dropdown-header text-start">
                  <h6>Filter</h6>
                </li>

                <li><a className="dropdown-item" href="#">Today</a></li>
                <li><a className="dropdown-item" href="#">This ff</a></li>
                <li><a className="dropdown-item" href="#">This Year</a></li>
              </ul>
            </div> */}

            <div className="card-body">
              <h5 className="card-title">Aktivitas <span>| Terbaru</span></h5>

              <div className="activity">

                {dataAllActivity.map((activity, index) => {
                  const status = activity.status;
                  const createdTime = new Date(activity.created_at); // Parsing waktu dari string ISO 8601
                  const currentTime = new Date(); // Waktu saat ini
                  const diffInMilliseconds = currentTime - createdTime; // Selisih waktu dalam milidetik
                  const diffInMinutes = Math.floor(diffInMilliseconds / (1000 * 60)); // Selisih waktu dalam menit
                  const diffInHours = Math.floor(diffInMinutes / 60); // Selisih waktu dalam jam
                  const diffInDays = Math.floor(diffInHours / 24); // Selisih waktu dalam hari
                  
                  let timeAgoText;
                  if (diffInDays === 0) {
                    // Kurang dari 1 hari
                    if (diffInHours === 0) {
                      // Kurang dari 1 jam
                      timeAgoText = `${diffInMinutes} minute ago`;
                    } else {
                      timeAgoText = `${diffInHours} hour ago`;
                    }
                  } else if (diffInDays === 1) {
                    timeAgoText = '1 day ago';
                  } else {
                    timeAgoText = `${diffInDays} days ago`;
                  }

                  if (status === "draf") {
                    return (
                      <div key={index} className="activity-item d-flex">
                        <div className="activite-label">{timeAgoText}</div>
                        {/* <div className="activity-label" dangerouslySetInnerHTML={{ __html: timeAgoText }}></div> */}
                        <i className="bi bi-circle-fill activity-badge text-success align-self-start"></i>
                        <div className="activity-content">
                          Posting artikel baru <a href="#" className="fw-bold text-dark">sebagai Draf</a>
                        </div>
                      </div>
                    );
                  } else {
                    return (
                      <div key={index} className="activity-item d-flex">
                        <div className="activite-label">{timeAgoText}</div>
                        <i className="bi bi-circle-fill activity-badge text-danger align-self-start"></i>
                        <div className="activity-content">
                          Posting artikel baru <a href="#" className="fw-bold text-dark">Dalam proses verifikasi</a>
                        </div>
                      </div>
                    );
                  }
                })}


              </div>

            </div>
          </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default MasterAdminContent;
