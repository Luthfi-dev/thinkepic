import React from "react";
import { useEffect } from "react";
import { publicApi } from "../../../utils/globals";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import 'bootstrap/dist/css/bootstrap.min.css';
import Carausel from "@/components/RootApp/carausel"

const DashboardApp = () => {
  const router = useRouter();

  

  return (
      <div className="container col-md-8">
        <div className="row">
            <div className="col-md-8">
               {/* MULAI KONTEN */}
                <Carausel />
               {/* end KONTEN */}
            </div>
            <div className="col-md-4">
                fsf
            </div>
        </div>
      </div>
  );
};

export default DashboardApp;
