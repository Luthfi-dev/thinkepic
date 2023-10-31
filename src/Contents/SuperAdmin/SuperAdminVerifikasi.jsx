import React, { useState, useEffect } from "react";
import Image from "next/image";
import { artikelApi, artikelPageApi, publicApi } from "../../../utils/globals";
import Link from "next/link";
import configureAxios from "../../../pages/axios-config";
import { showDynamicAlert } from "../showDynamicAlert";

const DataPosting = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [activeTab, setActiveTab] = useState('proses');
  const [totalMedia, setTotalMedia] = useState(0);
  const [rawData, setRawData] = useState([]);
  const [dataAll, setDataAll] = useState([]);
  const [searchText, setSearchText] = useState(''); 
  
  const fifiAxios = configureAxios();

const fetchData = async () => {
  try {
    const countResponse = await fifiAxios.get(artikelPageApi);
    const totalCount = countResponse.data.total;
    setTotalMedia(totalCount);

    let TabFix;
    if (activeTab === 'diterima') {
      TabFix = `${artikelPageApi}?jumlah=10&status=pra-terima&page=${currentPage}&search=${searchText}`;
    } else if (activeTab === 'ditolak') {
      TabFix = `${artikelPageApi}?jumlah=10&status=ditolak&page=${currentPage}&search=${searchText}`;
    } else {
      TabFix = `${artikelPageApi}?jumlah=10&status=proses&page=${currentPage}&search=${searchText}`;
    }

    const response = await fifiAxios.get(TabFix);

    if (!response.status === 200) {
      throw new Error('Gagal mengambil data.');
    }

    const dataAmbil = response.data;

    const filteredDataAll = dataAmbil.data.filter((item) =>
      activeTab !== 'draf' ? item.status !== 'draf' : true
    );

    setTotalMedia(dataAmbil.total);
    setDataAll(filteredDataAll);
  } catch (error) {
    console.error('Terjadi kesalahan:', error);
  }
};

// Hapus artikel
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
  }, []);

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
            <div className="col-lg-11">
              <Link href={`view?id=${id}`}>
            {media ? (
              isImage ? (
                <Image
                  width={100}
                  height={80}
                  objectFit="contain"
                  src={`${publicApi}/${media}`}
                  alt="foto thunbnail"
                />
              ) : (
                <Image
                  width={100}
                  height={80}
                  objectFit="contain"
                  src={`${publicApi}/default/thum_video.png`}
                  alt="video  thunbnail"
                />
              )
            ) : (
              <Image
                width={100}
                height={50}
                objectFit="contain"
                src={`${publicApi}/default/no_picture.png`}
                alt="foto thunbnail no image"
              />
            )}
            <h4>{judul}</h4>
            <p className="text-app">
              {isi.length > 50
                ? `${filterHTMLTags(isi).substring(0, 50)}...`
                : filterHTMLTags(isi)}
            </p>
          </Link>
          
          </div>
          <div className="col-lg-1 end-0">
              <Link className="btn btn-outline-warning d-none d-lg-inline" href={`/super-admin/posting/edit?id=${id}`}>
                <i className="bi bi-pencil-square"></i>
              </Link>
              <button className="btn btn-outline-danger d-none d-lg-inline" style={{marginLeft: "5px"}} onClick={() => hapusArtikel(id)}>
                <i className="bi bi-trash"></i>
              </button>
            </div>
            <div className="col-lg-1 mt-3 mb-2">
              <Link className="btn btn-outline-warning btn-sm d-inline d-lg-none" href={`/super-admin/posting/edit?id=${id}`}>
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
    const totalPages = Math.ceil(totalMedia / 10);

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
                            activeTab === "proses" ? "active" : ""
                          }`}
                          id="home-tab"
                          data-bs-toggle="tab"
                          data-bs-target="#bordered-justified-home"
                          type="button"
                          role="tab"
                          aria-controls="proses"
                          aria-selected={activeTab === "proses"}
                          onClick={() => handleTabChange("proses")}
                        >
                          Proses<span className="d-none"> Verifikasi</span>
                        </button>
                      </li>
                      <li className="nav-item flex-fill" role="presentation">
                        <button
                          className={`nav-link w-100 ${
                            activeTab === "diterima" ? "active" : ""
                          }`}
                          id="profile-tab"
                          data-bs-toggle="tab"
                          data-bs-target="#bordered-justified-profile"
                          type="button"
                          role="tab"
                          aria-controls="diterimas"
                          aria-selected={activeTab === "diterima"}
                          onClick={() => handleTabChange("diterima")}
                        >
                          Diterima
                        </button>
                      </li>
                      <li className="nav-item flex-fill" role="presentation">
                        <button
                          className={`nav-link w-100 ${
                            activeTab === "ditolak" ? "active" : ""
                          }`}
                          id="profile-tab"
                          data-bs-toggle="tab"
                          data-bs-target="#bordered-justified-profile"
                          type="button"
                          role="tab"
                          aria-controls="ditolaks"
                          aria-selected={activeTab === "ditolak"}
                          onClick={() => handleTabChange("ditolak")}
                        >
                          Ditolak
                        </button>
                      </li>
                    </ul>
                    <div
                      className="tab-content pt-3"
                      id="borderedTabJustifiedContent"
                    >
                      <div
                        className={`tab-pane fade ${
                          activeTab === "proses" ? "active show" : ""
                        }`}
                        id="bordered-justified-home"
                        role="tabpanel"
                        aria-labelledby="image-tab"
                      >
                        <div className="row mb-3">
                          <div className="col-md-12">
                            <div className="input-group mb-3">
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

                      <div
                        className={`tab-pane fade ${
                          activeTab === "ditolak" ? "active show" : ""
                        }`}
                        id="bordered-justified-profile"
                        role="tabpanel"
                        aria-labelledby="ditolaks-tab"
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
