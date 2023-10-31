// src/app/UserLayout.js

import React from "react";
// import "./globals.css";
import UserHeader from "./UserHeader";
import UserNav from "./UserNav";

// import { Inter } from "next/font/google";

// const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "thinkepic.",
  description: "thinkepic",
};

export function UserLayout({ children }) {
  return (
    <div>
      {/* <!-- ======= Header ======= --> */}
      <UserHeader />
      {/* <!-- End Header --> */}

      {/* <!-- ======= Sidebar ======= --> */}
      <UserNav />
      {/* <!-- End Sidebar--> */}

      <main id="main" className="main p-0">
        {/* <!-- End Page Title --> */}

        <section className="section" style={{ paddingRight: "-0px" }}>
          {/* <!-- START CONTENT --> */}

          {children}

          {/* <!-- END CONTENT --> */}
        </section>
      </main>
      {/* <!-- End #main --> */}

      {/* <!-- ======= Footer ======= --> */}
      <footer id="footer" className="footer">
        <div className="copyright">
          &copy; Copyright{" "}
          <strong>
            <span>Thinkepic</span>
          </strong>
          . All Rights Reserved
        </div>
      </footer>
      {/* <!-- End Footer --> */}

      <a
        href="#"
        className="back-to-top d-flex align-items-center justify-content-center"
      >
        <i className="bi bi-arrow-up-short"></i>
      </a>

      {/* <!-- Vendor JS Files --> */}
      <script src="/assets/vendor/apexcharts/apexcharts.min.js" async></script>
      <script
        src="/assets/vendor/bootstrap/js/bootstrap.bundle.min.js"
        async
      ></script>
      <script src="/assets/vendor/chart.js/chart.umd.js" async></script>
      <script src="/assets/vendor/echarts/echarts.min.js" async></script>
      <script src="/assets/vendor/quill/quill.min.js" async></script>
      <script
        src="/assets/vendor/simple-datatables/simple-datatables.js"
        async
      ></script>
      {/* <script src="/assets/vendor/tinymce/tinymce.min.js" async></script> */}
      <script src="/assets/vendor/php-email-form/validate.js" async></script>

      {/* <!-- Template Main JS File --> */}
      <script src="/assets/js/main.js" async></script>
    </div>
  );
}
