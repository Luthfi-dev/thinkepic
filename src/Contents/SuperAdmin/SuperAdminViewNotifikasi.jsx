import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { notifikasiApi } from "../../../utils/globals";
import configureAxios from "../../../pages/axios-config";
import { DataUser } from "@/components/DataUser";

const ViewNotifikasi = () => {
  const [notifications, setNotifications] = useState([]);

  const fifiAxios = configureAxios();
  const myUser = DataUser();
  const UserId = myUser !== null ? myUser.id_user : null;
  console.log(UserId);

  useEffect(() => {
    // Fungsi untuk mengambil data dari server
    const fetchData = async () => {
      if(myUser !== null) {
        try {
        const response = await fifiAxios.get(`${notifikasiApi}?user_id=${UserId}`);
        const data = response.data;
        console.log(data); 

        // Filter data sesuai dengan status yang diinginkan
        const filteredData = data.filter((item) => {
          return item.status === "pra-tolak" || item.status === "diterima";
        });

        // Ambil lima data teratas
        const topFiveNotifications = filteredData.slice(0, 5);

        setNotifications(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
      }
    };

    fetchData();
  }, [myUser]);

  // useEffect(()=>{
  //   fetchData();
  // },[])

function formatDateTime(dateTimeString) {
    // Buat objek Date dari dateTimeString
    const date = new Date(dateTimeString);

    // Dapatkan komponen tanggal, bulan, tahun, jam, dan menit
    const day = date.getDate();
    const month = date.getMonth() + 1; // Ingat, bulan dimulai dari 0 (Januari adalah 0)
    const year = date.getFullYear();
    const hours = date.getHours();
    const minutes = date.getMinutes();

    // Buat format jam dan tanggal yang diinginkan
    const formattedDateTime = `${day}/${month}/${year} ${hours}:${minutes}`;

    return formattedDateTime;
  }

  return (
    <div className="container">
      <div className="row card p-1" style={{display: "block"}}>

              {notifications.map((notification, index) => (
                <span className="m-5" key={index} >
                  <hr className="dropdown-divider" />
                    {notification.status === "ditolak" && (
                      <h4 className="btn btn-danger" style={{marginLeft:"20px",marginTop:"-30px"}}>Postingan ditolak</h4>
                    )}
                    {notification.status === "diterima" && (
                      <h4 className="btn btn-success" style={{marginLeft:"20px",marginTop:"-30px"}}>Postingan {notification.status}</h4>
                    )}
                    <div style={{border: "2px solid silver",marginTop:"-30px", padding:"20px 20px 10px 20px", borderRadius:"10px", boxShadow:"3px 3px 5px 2px silver"}}>
                      
                      <p
                        dangerouslySetInnerHTML={{
                          __html: notification.isi_notifikasi,
                        }}
                      />
                      <p>{formatDateTime(notification.created_at)}</p>
                      {/* jika belum ada notifikasi */}
                  </div>
                  <hr/>
                </span>
              ))}
          {(notifications.length > 0) ? "" : "Belum ada notifikasi"}

      </div>
    </div>
  );
};

export default ViewNotifikasi;
