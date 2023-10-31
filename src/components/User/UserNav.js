import React from "react";
import Link from "next/link";

const UserNav = () => {
  return (
    <>
      <aside id="sidebar" className="sidebar" style={{ zIndex: "999" }}>
        <ul className="sidebar-nav" id="sidebar-nav">
          <li className="nav-item">
            <Link href="/" legacyBehavior>
              <a className="nav-link ">
                <i className="bi bi-grid"></i>
                <span>Dashboard</span>
              </a>
            </Link>
          </li>
          {/* <!-- End Dashboard Nav --> */}

          {/* <!-- End Components Nav --> */}

          <li className="nav-item">
            <Link href="#" legacyBehavior>
              <a
                className="nav-link collapsed"
                data-bs-target="#forms-nav"
                data-bs-toggle="collapse"
              >
                <i className="bi bi-journal-text"></i>
                <span>Kategori</span>
                <i className="bi bi-chevron-down ms-auto"></i>
              </a>
            </Link>
            <ul
              id="forms-nav"
              className="nav-content collapse "
              data-bs-parent="#sidebar-nav"
            >
              <li>
                <Link href="#" legacyBehavior>
                  <a>
                    <span>
                      <i
                        className="ri-file-list-3-fill"
                        style={{ fontSize: "12pt" }}
                      ></i>{" "}
                      Berita
                    </span>
                  </a>
                </Link>
              </li>

              <li>
                <Link href="#" legacyBehavior>
                  <a>
                    <span>
                      <i
                        className="ri-vidicon-2-line"
                        style={{ fontSize: "12pt" }}
                      ></i>{" "}
                      Video
                    </span>
                  </a>
                </Link>
              </li>

              <li>
                <Link href="#" legacyBehavior>
                  <a>
                    <span>
                      <i
                        className="ri-camera-line"
                        style={{ fontSize: "12pt" }}
                      ></i>{" "}
                      Foto
                    </span>
                  </a>
                </Link>
              </li>
            </ul>
          </li>

          {/* <!-- End Forms Nav --> */}

          <li className="nav-heading">Account</li>

          {/* <li className="nav-item">
            <Link href="users-profile.html" legacyBehavior>
              <a className="nav-link collapsed">
                <i className="bi bi-person"></i>
                <span>Profile</span>
              </a>
            </Link>
          </li> */}
          {/* <!-- End Profile Page Nav --> */}

          <li className="nav-item">
            <Link href="/auth/re-login" legacyBehavior>
              <a className="nav-link collapsed">
                <i className="bi bi-box-arrow-in-right"></i>
                <span>Login</span>
              </a>
            </Link>
          </li>
          {/* <!-- End Login Page Nav --> */}
        </ul>
      </aside>
    </>
  );
};

export default UserNav;
