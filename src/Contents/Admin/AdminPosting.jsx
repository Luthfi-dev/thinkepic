import React from "react";
import AdminContentProses from "./Proses/AdminContentProses"
import Link from "next/link";

const AdminPosting = () => {
    return (
        <>
        <div className="pagetitle">
          <nav>
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link href="/">Home</Link>
              </li>
              <li className="breadcrumb-item active">Posting</li>
            </ol>
          </nav>
        </div>

        {/* section content */}

        {/* PROSES */}
        <AdminContentProses />
            
        </>
    )
}

export default AdminPosting;
