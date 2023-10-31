import Image from "next/image";
import React from "react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Dropdown, ButtonGroup } from "react-bootstrap";
import FullScreenDialog from "./SearcUser";

const AdminHeader = () => {
  const router = useRouter();
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const [currentLanguage, setCurrentLanguage] = useState("id"); // Default language is Indonesian

  const toggleLanguage = () => {
    setCurrentLanguage(currentLanguage === "id" ? "en" : "id"); // Toggle between 'id' and 'en' for Indonesian and English
  };

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

    // Cek ukuran layar saat ini
    if (window.innerWidth < 992) {
      // Ukuran layar mobile
      if (isSidebarOpen) {
        body.classList.add("toggle-sidebar");
      } else {
        body.classList.remove("toggle-sidebar");
      }
    } else {
      // Ukuran layar desktop
      if (isSidebarOpen) {
        body.classList.remove("toggle-sidebar");
      } else {
        body.classList.add("toggle-sidebar");
      }
    }
  }, [isSidebarOpen]);

  // Tambahkan event listener untuk memantau perubahan ukuran layar
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 992) {
        // Ukuran layar mobile
        if (isSidebarOpen) {
          document.body.classList.add("toggle-sidebar");
        } else {
          document.body.classList.remove("toggle-sidebar");
        }
      } else {
        // Ukuran layar desktop
        if (isSidebarOpen) {
          document.body.classList.remove("toggle-sidebar");
        } else {
          document.body.classList.add("toggle-sidebar");
        }
      }
    };

    // Tambahkan event listener untuk memantau perubahan ukuran layar
    window.addEventListener("resize", handleResize);

    // Hapus event listener saat komponen dibongkar
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [isSidebarOpen]);

  return (
    <header
      id="header"
      className="header fixed-top d-flex align-items-center"
      style={{ zIndex: "9999" }}
    >
      {/* SECTION SEARCH */}
      {/* END ECTION SEARCH */}
      <div className="d-flex align-items-center justify-content-between">
        <Link href="/" className="logo d-flex align-items-center">
          <Image
            src="/assets/img/logo.png"
            alt="logo epic"
            width={40}
            height={50}
          />
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

      <div className="search-bar">
        <div className="search-form d-flex align-items-center">
          <input
            type="text"
            name="query"
            placeholder="Search"
            title="Enter search keyword"
          />
          <button title="Search" className="color-app">
            <FullScreenDialog />
          </button>
        </div>
      </div>
      {/* <!-- End Search Bar --> */}

      <nav className="header-nav ms-auto">
        <ul className="d-flex align-items-center">
          <li className="nav-item d-block d-lg-none">
            <span className="nav-link nav-icon search-bar-toggle color-app">
              <FullScreenDialog />
            </span>
          </li>
          {/* <!-- End Search Icon--> */}

          <li className="nav-item dropdown pe-3">
            <Dropdown as={ButtonGroup}>
              <span className="nav-link nav-profile d-flex align-items-center pe-0 bg-ligth">
                <Image
                  width={30}
                  height={50}
                  src={`/assets/gambar/bendera/${
                    currentLanguage === "id" ? "id" : "en"
                  }.ico`}
                  alt="Flag"
                  className="rounded-circle"
                />
                <span className="d-none d-md-block ps-2">
                  {currentLanguage === "id" ? "Bahasa Indo" : "English"}
                </span>
              </span>
              <Dropdown.Toggle
                split
                variant="light"
                id="dropdown-split-basic"
                style={{ backgroundColor: "white", border: "0px solid white" }}
              />
              <Dropdown.Menu>
                <Dropdown.Item onClick={toggleLanguage}>
                  {currentLanguage === "id"
                    ? "Switch to English"
                    : "Pindah ke Bahasa Indo"}
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            {/* <!-- End Profile Iamge Icon --> */}

            {/* <!-- End Profile Dropdown Items --> */}
          </li>
          {/* <!-- End Profile Nav --> */}
        </ul>
      </nav>
      {/* <!-- End Icons Navigation --> */}
    </header>
  );
};

export default AdminHeader;
