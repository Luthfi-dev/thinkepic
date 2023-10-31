import Image from "next/image";
import React from "react";
import Link from "next/link";
import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { notifikasiApi } from "../../../utils/globals";
import configureAxios from "../../../pages/axios-config";
import { DataUser } from "../DataUser";

const MasterAdminHeader = () => {
  const router = useRouter();
  const myUser = DataUser();
  // console.log("gggg", myUser);

  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [totalNotifications, setTotalNotifications] = useState(0);

  const fifiAxios = configureAxios();

  useEffect(() => {
    // console.log("ini stttttt");
    const UserId = myUser !== null ? myUser.id_user : null;
    // console.log("iddd", UserId);
    // Fungsi untuk mengambil data dari server
    const fetchData = async () => {
      try {
        if (myUser !== null) {
          const response = await fifiAxios.get(
            `${notifikasiApi}?user_id=${UserId}`
          );
          const data = response.data;
          // console.log("ini res data header", data);

          // Filter data sesuai dengan status yang diinginkan
          const filteredData = data.filter((item) => {
            return item.status === "ditolak" || item.status === "diterima";
          });

          // Ambil lima data teratas
          const topFiveNotifications = filteredData.slice(0, 5);

          setNotifications(topFiveNotifications);
          setTotalNotifications(filteredData.length);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [myUser]);

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

  // Fungsi untuk menampilkan atau menyembunyikan sidebar
  function tampilkanToggleSidebar() {
    setSidebarOpen(!isSidebarOpen);
  }

  // Efek ini akan dipanggil setiap kali URL berubah
  useEffect(() => {
    // Tutup sidebar saat URL berubah
    setSidebarOpen(false);
  }, [router.asPath]); // Memantau perubahan URL

  // Set class pada body sesuai dengan status sidebar
  useEffect(() => {
    const body = document.body;
    if (isSidebarOpen) {
      body.classList.add("toggle-sidebar");
    } else {
      body.classList.remove("toggle-sidebar");
    }
  }, [isSidebarOpen]);

  return (
    <header
      id="header"
      className="header fixed-top d-flex align-items-center"
      style={{ zIndex: "9999" }}
    >
      <div className="d-flex align-items-center justify-content-between">
        <Link href="index.html" className="logo d-flex align-items-center">
          <Image src="/assets/img/logo.png" alt="" width={40} height={50} />
          <span
            className="d-none d-lg-block"
            // style={{ backgroundImage: "url(/assets/img/logo-text.png)" }}
          >
            <Image
              src="/assets/img/logotext.PNG"
              alt="logo epic"
              width={150}
              height={80}
            />
          </span>
        </Link>
        <i
          className="bi bi-list toggle-sidebar-btn"
          onClick={tampilkanToggleSidebar}
        ></i>
      </div>
      {/* <!-- End Logo --> */}

      <nav className="header-nav ms-auto">
        <ul className="d-flex align-items-center">
          <li className="nav-item dropdown">
            <Link
              className="nav-link nav-icon"
              href="#"
              data-bs-toggle="dropdown"
            >
              <i className="bi bi-bell"></i>
              <span className="badge bg-primary badge-number">
                {totalNotifications}
              </span>
            </Link>
            {/* <!-- End Notification Icon --> */}

            <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow notifications">
              <li className="dropdown-header">
                Kamu punya {totalNotifications} notifikasi
                {notifications.length > 0 ? (
                  <Link href="/super-admin/notifikasi">
                    <span className="badge rounded-pill bg-primary p-2 ms-2">
                      View all
                    </span>
                  </Link>
                ) : (
                  <p></p>
                )}
              </li>

              {notifications.map((notification, index) => (
                <li key={index}>
                  <hr className="dropdown-divider" />
                  <div className="notification-item">
                    {notification.status === "pra-tolak" && (
                      <i className="bi bi-x-circle text-danger"></i>
                    )}
                    {notification.status === "diterima" && (
                      <i className="bi bi-check-circle text-success"></i>
                    )}
                    <div>
                      <h4>Postingan {notification.status}</h4>
                      <p
                        dangerouslySetInnerHTML={{
                          __html: notification.isi_notifikasi,
                        }}
                      />
                      <p>{formatDateTime(notification.created_at)}</p>
                    </div>
                  </div>
                </li>
              ))}

              <li>
                <hr className="dropdown-divider" />
              </li>
              {notifications.length > 0 ? (
                <li className="dropdown-footer">
                  <Link href="/super-admin/notifikasi">
                    Show all notifications
                  </Link>
                </li>
              ) : (
                <li></li>
              )}
            </ul>
            {/* <!-- End Notification Dropdown Items --> */}
          </li>
          {/* <!-- End Notification Nav --> */}

          <li className="nav-item dropdown pe-3">
            <Link
              className="nav-link nav-profile d-flex align-items-center pe-0"
              href="#"
              data-bs-toggle="dropdown"
            >
              <Image
                width={40}
                height={50}
                src="/assets/img/profile-img.jpg"
                alt="Profile"
                className="rounded-circle"
              />
              <span className="d-none d-md-block dropdown-toggle ps-2">
                Master Admin
              </span>
            </Link>
            {/* <!-- End Profile Iamge Icon --> */}

            <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow profile">
              <li className="dropdown-header">
                <h6>MasterAdmin</h6>
                <span>Editor</span>
              </li>
              <li>
                <hr className="dropdown-divider" />
              </li>

              <li>
                <Link
                  className="dropdown-item d-flex align-items-center"
                  href="users-profile.html"
                >
                  <i className="bi bi-person"></i>
                  <span>My Profile</span>
                </Link>
              </li>
              <li>
                <hr className="dropdown-divider" />
              </li>

              <li>
                <Link
                  className="dropdown-item d-flex align-items-center"
                  href="users-profile.html"
                >
                  <i className="bi bi-gear"></i>
                  <span>Account Settings</span>
                </Link>
              </li>
              <li>
                <hr className="dropdown-divider" />
              </li>

              <li>
                <Link
                  className="dropdown-item d-flex align-items-center"
                  href="pages-faq.html"
                >
                  <i className="bi bi-question-circle"></i>
                  <span>Need Help?</span>
                </Link>
              </li>
              <li>
                <hr className="dropdown-divider" />
              </li>

              <li>
                <Link
                  className="dropdown-item d-flex align-items-center"
                  href="#"
                >
                  <i className="bi bi-box-arrow-right"></i>
                  <span>Sign Out</span>
                </Link>
              </li>
            </ul>
            {/* <!-- End Profile Dropdown Items --> */}
          </li>
          {/* <!-- End Profile Nav --> */}
        </ul>
      </nav>
      {/* <!-- End Icons Navigation --> */}
    </header>
  );
};

export default MasterAdminHeader;
