import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";

const MasterAdminNav = () => {
  const router = useRouter();

  // Fungsi untuk mengecek apakah menu aktif
  const isMenuActive = (path) => {
    return router.pathname === path ? "active" : "";
  };

  return (
    <>
      <aside id="sidebar" className="sidebar" style={{ zIndex: "999" }}>
        <ul className="sidebar-nav" id="sidebar-nav">
          <li className={`nav-item ${isMenuActive("/master-admin")}`}>
            <Link href="/master-admin" legacyBehavior>
              <a className="nav-link ">
                <i className="bi bi-grid"></i>
                <span>Dashboard</span>
              </a>
            </Link>
          </li>

          <li
            className={`nav-item ${isMenuActive("/master-admin/verifikasi")}`}
          >
            <Link href="/master-admin/verifikasi" legacyBehavior>
              <a className="nav-link collapsed">
                <i className="bi bi-card-checklist"></i>
                <span>Setujui</span>
              </a>
            </Link>
          </li>

          {/* <!-- End Dashboard Nav --> */}

          {/* <!-- End Components Nav --> */}

          <li className={`nav-item ${isMenuActive("/master-admin/postingan")}`}>
            <Link href="#" legacyBehavior>
              <a
                className="nav-link collapsed"
                data-bs-target="#forms-nav"
                data-bs-toggle="collapse"
              >
                <i className="bi bi-journal-text"></i>
                <span>Postingan</span>
                <i className="bi bi-chevron-down ms-auto"></i>
              </a>
            </Link>
            <ul
              id="forms-nav"
              className="nav-content collapse "
              data-bs-parent="#sidebar-nav"
            >
              <li>
                <Link href="/master-admin/data-posting" legacyBehavior>
                  <a>
                    <span>
                      <i
                        className="ri-file-list-3-fill"
                        style={{ fontSize: "12pt" }}
                      ></i>{" "}
                      Semua Artikel
                    </span>
                  </a>
                </Link>
              </li>

              <li>
                <Link href="/master-admin/posting" legacyBehavior>
                  <a>
                    <span>
                      <i
                        className="ri-add-circle-line"
                        style={{ fontSize: "12pt" }}
                      ></i>{" "}
                      Artikel
                    </span>
                  </a>
                </Link>
              </li>

              {/* <li>
                <Link href="/master-admin/category" legacyBehavior>
                  <a>
                    <span>
                      <i
                        className="ri-add-circle-fill"
                        style={{ fontSize: "12pt" }}
                      ></i>{" "}
                      Kategori
                    </span>
                  </a>
                </Link>
              </li> */}
            </ul>
          </li>

          <li className={`nav-item ${isMenuActive("/master-admin/media")}`}>
            <Link href="/master-admin/media" legacyBehavior>
              <a className="nav-link collapsed">
                <i className="bi bi-bank"></i>
                <span>Media</span>
              </a>
            </Link>
          </li>
          {/* <!-- End Forms Nav --> */}

          <li className="nav-heading">Settings</li>

          <li className={`nav-item ${isMenuActive("/master-admin/profile")}`}>
            <Link href="users-profile.html" legacyBehavior>
              <a className="nav-link collapsed">
                <i className="bi bi-person"></i>
                <span>Profile</span>
              </a>
            </Link>
          </li>
          {/* <!-- End Profile Page Nav --> */}

          <li className={`nav-item ${isMenuActive("/master-admin/logout")}`}>
            <Link href="/auth/logout" legacyBehavior>
              <a className="nav-link collapsed">
                <i className="bi bi-box-arrow-in-right"></i>
                <span>Log Out</span>
              </a>
            </Link>
          </li>
          {/* <!-- End Login Page Nav --> */}
        </ul>
      </aside>
    </>
  );
};

export default MasterAdminNav;
