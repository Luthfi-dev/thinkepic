import React, { useState, useEffect } from "react";
import Image from "next/image";
import { artikelApi, artikelPageApi, publicApi } from "../../../utils/globals";
import Link from "next/link";
import configureAxios from "../../../pages/axios-config";
import { DataUser } from "@/components/DataUser";

const DataPosting = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [activeTab, setActiveTab] = useState('draf');
  const [totalMedia, setTotalMedia] = useState(0);
  const [rawData, setRawData] = useState([]);
  const [dataAll, setDataAll] = useState([]);
  const [searchText, setSearchText] = useState('');

  const fifiAxios = configureAxios();
  const myUser = DataUser();
  const UserId = myUser !== null ? myUser.id_user : null;
  
  const fetchData = async () => {
      if(myUser !== null){
          try {
            const countResponse = await fifiAxios.get(`${artikelPageApi}?id_user=${UserId}`);
            const countData = countResponse.data;
            const totalCount = countData.total;
            setTotalMedia(totalCount);
            console.log(totalCount)

            const response = await fifiAxios.get(
              activeTab === 'draf'
                ? `${artikelPageApi}?status=draf&page=${currentPage}&search=${searchText}&id_user=${UserId}` 
                : `${artikelPageApi}?jumlah=20&page=${currentPage}&search=${searchText}&id_user=${UserId}`
            );

            console.log(response);

            const dataAmbil = response.data;

            const filteredDataAll = dataAmbil.data.filter((item) =>
              activeTab !== 'draf' ? item.status !== 'draf' : true
            );

            setTotalMedia(dataAmbil.total);
            setDataAll(filteredDataAll);
            console.log(dataAll)
          } catch (error) {
            console.error('Terjadi kesalahan:', error);
          }
      }
  };

  // hapus artikel
  const hapusArtikel = async (artikelId) => {
    try {
      const response = await fifiAxios.delete(`${artikelApi}/${artikelId}`);

      if (response.status === 200) {
        console.log('Artikel berhasil dihapus.');
        fetchData();
      } else {
        console.error('Gagal menghapus Artikel.');
      }
    } catch (error) {
      console.error('Terjadi kesalahan:', error);
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleSearch = () => {
    fetchData();
  };

  useEffect(() => {
    fetchData();
  }, [myUser]);

  useEffect(() => {
    fetchData();
  }, [currentPage, activeTab, searchText]);

  function filterHTMLTags(text) {
    return text.replace(/<\/?[^>]+(>|$)/g, "");
  }

  const renderDataAll = (dataAll) => {
    return dataAll.map((item, index) => {
      const { id, media, judul, isi } = item;
      const fotoEkstensi = media ? media.split(".").pop().toLowerCase() : "";
      const isImage = ["jpg", "jpeg", "png", "gif"].includes(fotoEkstensi);

      return (
        <div className="post-item clearfix" key={index}>
          <div className="row">
            <div className="col-lg-10">
              <Link href={`view-artikel?id=${id}`}>
            {
              media !== "" ? (
                <Image
                  width={100}
                  height={80}
                  objectFit="contain"
                  src={`${publicApi}/${media}`}
                  alt="foto thumbnail"
                />
              ) : (
                <Image
                  width={100}
                  height={50}
                  objectFit="contain"
                  src={`${publicApi}/default/no_picture.png`}
                  alt="foto thumbnail no image"
                />
              )
            }

            <h4>{judul}</h4>
            <p className="text-app">
              {isi.length > 50
                ? `${filterHTMLTags(isi).substring(0, 50)}...`
                : filterHTMLTags(isi)}
            </p>
          </Link>
          
          </div>
          <div className="col-lg-1 end-0" style={{opacity:"0.7"}}>
            <div className="d-flex justify-content-end">
              <span className={
              item.status === "proses" || item.status === "pra-terima"
                ? "btn btn-warning btn-sm"
                : item.status === "diterima"
                ? "btn btn-success btn-sm"
                : item.status === "ditolak"
                ? "btn btn-danger btn-sm"
                : ""
            }>
              {item.status === "proses" || item.status === "pra-terima"
                ? "On Review"
                : item.status === "diterima"
                ? "Published"
                : item.status === "ditolak"
                ? "Rejected"
                : ""}
            </span>
            </div>
          </div>
          <div className="col-lg-1 end-0">
              <Link className="btn btn-outline-warning d-none d-lg-inline" href={`/admin/posting/edit?id=${id}`}>
                <i className="bi bi-pencil-square"></i>
              </Link>
              <button className="btn btn-outline-danger d-none d-lg-inline" style={{marginLeft: "5px"}} onClick={() => hapusArtikel(id)}>
                <i className="bi bi-trash"></i>
              </button>
            </div>
            <div className="col-lg-1 mt-3 mb-2">
              <Link className="btn btn-outline-warning btn-sm d-inline d-lg-none" href={`/admin/posting/edit?id=${id}`}>
                <i className="bi bi-pencil-square"></i>
              </Link>
              <button className="btn btn-outline-danger btn-sm d-inline d-lg-none" style={{marginLeft: "5px"}} onClick={() => hapusArtikel(id)}>
                <i className="bi bi-trash"></i>
              </button>
            </div>
          <hr />
            </div>
            
        </div>
      );
    });
  };

  const renderPagination = () => {
    const totalPages = Math.ceil(totalMedia / 20);

    if (totalPages <= 1) {
      return null;
    }

    const currentPageIndex = currentPage - 1;

    const renderPageButton = (pageNumber) => (
      <button
        key={pageNumber}
        onClick={() => handlePageChange(pageNumber)}
        className={`page-link rounded-circle ${currentPage === pageNumber ? 'active' : ''}`}
      >
        {pageNumber}
      </button>
    );

    return (
      <nav aria-label="Page navigation example">
        <ul className="pagination">
          {currentPage > 1 && (
            <>
              <li className="btn btn-light bordered" onClick={() => handlePageChange(1)}>previous</li>
              {currentPage > 2 && <span className="ellipsis">...</span>}
            </>
          )}

          {currentPage > 1 && renderPageButton(currentPage - 1)}

          {renderPageButton(currentPage)}

          {currentPage < totalPages && renderPageButton(currentPage + 1)}

          {currentPage < totalPages - 1 && <span className="ellipsis">...</span>}
          {currentPage < totalPages - 1 && renderPageButton(totalPages)}

          {currentPage < totalPages && (
            <li className="btn btn-light bordered" onClick={() => handlePageChange(totalPages)}>Next</li>
          )}
        </ul>
      </nav>
    );
  };

  return (
    <>
      <div className="pagetitle">
        <nav>
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link href="/">Home</Link>
            </li>
            <li className="breadcrumb-item active">Data Posting</li>
          </ol>
        </nav>
      </div>

      <div className="row">
        <div className="col-xxl-12 col-md-12">
          <div className="card p-2">
            <h5 className="card-title p-2">
              Semua <span>| Postingan</span>
            </h5>

            <div className="news m-2">
              <section className="row">
                <div className="col-xxl-12 col-md-12">
                  <div className="card-body">
                    <ul
                      className="nav nav-tabs nav-tabs-bordered d-flex"
                      id="borderedTabJustified"
                      role="tablist"
                    >
                      <li className="nav-item flex-fill" role="presentation">
                        <button
                          className={`nav-link w-100 ${
                            activeTab === "draf" ? "active" : ""
                          }`}
                          id="home-tab"
                          data-bs-toggle="tab"
                          data-bs-target="#bordered-justified-home"
                          type="button"
                          role="tab"
                          aria-controls="draf"
                          aria-selected={activeTab === "draf"}
                          onClick={() => handleTabChange("draf")}
                        >
                          Draf
                        </button>
                      </li>
                      <li className="nav-item flex-fill" role="presentation">
                        <button
                          className={`nav-link w-100 ${
                            activeTab === "artikel" ? "active" : ""
                          }`}
                          id="profile-tab"
                          data-bs-toggle="tab"
                          data-bs-target="#bordered-justified-profile"
                          type="button"
                          role="tab"
                          aria-controls="artikels"
                          aria-selected={activeTab === "artikel"}
                          onClick={() => handleTabChange("artikel")}
                        >
                          Artikel
                        </button>
                      </li>
                    </ul>
                    <div
                      className="tab-content pt-3"
                      id="borderedTabJustifiedContent"
                    >
                      <div
                        className={`tab-pane fade ${
                          activeTab === "draf" ? "active show" : ""
                        }`}
                        id="bordered-justified-home"
                        role="tabpanel"
                        aria-labelledby="image-tab"
                      >
                        <div className="row mb-3">
                          <div className="col-md-12">
                            {/* <div className="input-group mb-3">
                              <input
                                id="mysearch"
                                type="text"
                                className="form-control"
                                placeholder="Cari..."
                                value={searchText}
                                onChange={(e) => setSearchText(e.target.value)}
                              />
                              <button
                                className="btn btn-outline-secondary btn-app"
                                type="button"
                                onClick={() => handleSearch()}
                              >
                               <i className="bi bi-search"></i>
                              </button>
                            </div> */}
                          </div>
                        </div>
                        {renderDataAll(dataAll)}
                        {renderPagination()}
                      </div>
                      <div
                        className={`tab-pane fade ${
                          activeTab === "artikel" ? "active show" : ""
                        }`}
                        id="bordered-justified-profile"
                        role="tabpanel"
                        aria-labelledby="artikels-tab"
                      >
                        <div className="row mb-3">
                          <div className="col-md-12">
                            <div className="input-group mb-12">
                              <input
                                id="mysearch"
                                type="text"
                                className="form-control"
                                placeholder="Cari..."
                                value={searchText}
                                onChange={(e) => setSearchText(e.target.value)}
                              />
                              <button
                                className="btn btn-outline-secondary btn-app"
                                type="button"
                                onClick={() => handleSearch()}
                              >
                               <i className="bi bi-search"></i>
                              </button>
                            </div>
                          </div>
                        </div>
                        {renderDataAll(dataAll)}
                        {renderPagination()}
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DataPosting;
