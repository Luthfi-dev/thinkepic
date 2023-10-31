// AdminContentProses.js

import React, { useState, useEffect } from "react";
const axios = require("axios");
import { v4 as uuidv4 } from "uuid";
import FileUploadCard from "../SuperUploadFile";
import FileUploadMediaContent from "../SuperUploadFileMediaContent";
import {
  artikelApi,
  artikelPageApi,
  kategoriApi,
  menuApi,
} from "../../../../utils/globals";
import TagInput from "react-tagsinput";
import "react-tagsinput/react-tagsinput.css";
import dynamic from "next/dynamic";
import configureAxios from "../../../../pages/axios-config";
import { DataUser } from "@/components/DataUser";
import { showDynamicAlert } from "@/Contents/showDynamicAlert";

const modules = {
  toolbar: [
    [],
    [],
    ["link", "video"],
    [{ header: "0" }, { header: "1" }, { header: "2" }, { font: [] }],
    [{ size: [] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [{ align: [] }],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["clean"],
  ],
  clipboard: {
    matchVisual: false,
  },
};

const QuillEditor = dynamic(() => import("react-quill"), { ssr: false });

const MyForm = () => {
  const [addCardClass, setAddCardClass] = useState(false);
  const [tags, setTags] = useState([]); // State untuk menyimpan tags

  const fifiAxios = configureAxios();
  const myUser = DataUser();
  const UserId = myUser !== null ? myUser.id_user : null;

  useEffect(() => {
    // Fungsi untuk menangani peristiwa scroll
    const handleScroll = () => {
      if (window.scrollY >= 100) {
        setAddCardClass(true);
      } else {
        setAddCardClass(false);
      }
    };

    // Tambahkan event listener untuk mendengarkan peristiwa scroll
    window.addEventListener("scroll", handleScroll);

    // Jangan lupa untuk menghapus event listener saat komponen unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const [formData, setFormData] = useState({
    id: uuidv4(),
    judul: "",
    type_konten: "",
    kategori: "",
    media: "",
    mediacontent: "",
    tags: [],
    slugg: "",
    quillContent: "",
  });

  // Fungsi untuk mengambil data dari API berdasarkan judul
  async function fetchDataFromApi(judul) {
    try {
      const response = await fifiAxios.get(artikelApi);
      const data = response.data;

      // Mengumpulkan semua slug dari data API ke dalam array
      const slugs = data.map((item) => item.slug);

      // Memeriksa apakah judul sudah ada dalam slug yang ada
      const slugFromTitle = createSlug(judul);

      if (slugs.includes(slugFromTitle)) {
        // Jika slug sudah ada, buat slug unik
        const uniqueSlug = makeSlugUnique(slugFromTitle, slugs);
        return uniqueSlug;
      } else {
        // Jika slug belum ada, gunakan slug dari judul
        return slugFromTitle;
      }
    } catch (error) {
      console.error("Terjadi kesalahan saat mengambil data dari API:", error);
      // Handle kesalahan sesuai kebutuhan Anda
    }
  }

  // Fungsi untuk mengubah judul menjadi slug
  function createSlug(title) {
    const slug = title.toLowerCase().replace(/\s+/g, "-");
    return slug;
  }

  // Fungsi untuk membuat slug menjadi unik
  function makeSlugUnique(slug, existingSlugs) {
    let uniqueSlug = slug;
    let counter = 1;

    while (existingSlugs.includes(uniqueSlug)) {
      uniqueSlug = `${slug}-${counter}`;
      counter++;
    }

    return uniqueSlug;
  }

  // END BAGIAN SLUGS

  useEffect(() => {
    // console.log("form berubah", formData);
  }, [formData]);

  const handleTagsChange = (newTags) => {
    setTags(newTags); // Update state tags saat tags berubah
    setFormData((prevData) => ({
      ...prevData,
      tags: newTags, // Perbarui formData.tags dengan nilai terbaru
    }));
  };

  const handleChange = async (e) => {
    const { name, value } = e.target;
    console.log("Input berubah==:", name, value, formData);
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    if (name === "judul") {
      const result = await fetchDataFromApi(value);
      document.querySelector("#slugg").value = result;
      // Gunakan fungsi setFormData lagi untuk memperbarui formData
      setFormData((prevData) => ({
        ...prevData,
        slugg: result,
      }));
    }
  };

  const [dataSubMenu, setDataSubMenu] = useState([]);
  const handleChangeMenu = async (nilai) => {
    try {
      const response = await fifiAxios.get(`${menuApi}/${nilai}`);
      const categoryData = response.data;
      setDataSubMenu(categoryData);
      console.log("ini data submenu", nilai, dataSubMenu);
    } catch (error) {
      console.error("Error fetching data:", error);
      setDataSubMenu([]);
      console.log("ini data submenu", nilai, dataSubMenu);
    }
  };

  const handleQuillChange = (value) => {
    const i_foto = document.getElementById("n_foto");
    // console.log("Input berubah:", value, formData);
    setFormData((prevData) => ({
      ...prevData,
      quillContent: value,
    }));
  };

  // bagian handle kategori
  const [dataKategori, setDataKategori] = useState([]);
  const ktg = async () => {
    if (myUser !== null) {
      try {
        const response = await fifiAxios.get(kategoriApi);
        const categoryData = response.data;
        setDataKategori(categoryData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
  };

  // bagian handle Menu
  const [dataMenu, setDataMenu] = useState([]);
  const menus = async () => {
    try {
      const response = await fifiAxios.get(menuApi);
      const categoryData = response.data;
      setDataMenu(categoryData);
      console.log(dataMenu);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    menus();
  }, []);

  useEffect(() => {
    ktg();
  }, [myUser]);

  // FUNGSI onBlur
  const tidaFokuslagi = async () => {
    try {
      const response = await fifiAxios.get(artikelApi);
      const hasilData = response.data;

      // UPDATE INFO DRAF
      // Ambil elemen dengan ID "drafInfo"
      const drafInfoElement = document.getElementById("drafInfo");
      drafInfoElement.innerHTML = "draf tersimpan";
      // Set timeout selama 3 detik untuk mengosongkan elemen drafInfo
      setTimeout(() => {
        // Mengosongkan innerHTML elemen drafInfo
        drafInfoElement.innerHTML = "";
      }, 3000);
      // END DRAF INFO

      // Update keterangan Draf
      document.querySelector("#ketDraf").innerHTML = "Tersimpan";

      const adaYangSama = hasilData.some((item) => item.id === formData.id);
      // console.log("samaa", adaYangSama);

      if (adaYangSama) {
        // Update keterangan public
        document.querySelector("#ketPublic").innerHTML = "Private (Draf)";
        // sebelum di put cek dulu status artikelnya
        const responseStatus = await fifiAxios.get(
          `${artikelPageApi}?id=${formData.id}`,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const statusBaru = responseStatus.data;
        const dataBaruFix = statusBaru.data[0].status;
        // Contoh penggunaan
        const dataToSend = {
          id: formData.id,
          judul: formData.judul,
          type_konten: formData.type_konten,
          media: formData.media,
          kategori: formData.kategori,
          isi: formData.quillContent,
          tags: `${formData.tags}`,
          slug: formData.slugg,
          user_id: UserId,
          status: dataBaruFix,
        };
        const response = await fifiAxios.put(
          `${artikelApi}/${formData.id}`,
          dataToSend,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        // console.log("update", response);
        return true;
      } else {
        // Contoh penggunaan
        const dataToSend = {
          id: formData.id,
          judul: formData.judul,
          type_konten: formData.type_konten,
          media: formData.media,
          kategori: formData.kategori,
          isi: formData.quillContent,
          tags: `${formData.tags}`,
          slug: formData.slugg,
          user_id: UserId,
          status: "draf",
        };
        const response = await fifiAxios.post(artikelApi, dataToSend, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        // console.log("post", response);
        return false;
      }
    } catch (error) {
      console.error("Error:", error);
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    showDynamicAlert("Loading..", "loading");
    const tidakFokus = await tidaFokuslagi();
    // console.log(tidakFokus);

    // update ket public
    document.querySelector("#ketPublic").innerHTML = "Private (OnReview)";

    // Contoh penggunaan
    const dataToSend = {
      id: formData.id,
      judul: formData.judul,
      type_konten: formData.type_konten,
      media: formData.media,
      kategori: formData.kategori,
      isi: formData.quillContent,
      tags: `${formData.tags}`,
      slug: formData.slugg,
      user_id: UserId,
      status: "pra-terima",
    };

    // hentikan post jika data kosong
    if (
      formData.judul == "" ||
      formData.quillContent == "" ||
      formData.tags == ""
    ) {
      showDynamicAlert(
        "kolom judul, isi postingan dan tags tidak boleh kosong",
        "error"
      );
      return;
    }

    let apiMethod = "post"; // Default method
    let link = artikelApi;

    if (tidakFokus) {
      apiMethod = "put";
      link = `${artikelApi}/${formData.id}`;
    }

    // Fungsi untuk mengirim data ke API
    async function postDataToAPI(data) {
      try {
        const response = await fifiAxios[apiMethod](link, data, {
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.status === 200) {
          showDynamicAlert(
            `Data berhasil Dikirim untuk Diverifikasi`,
            "successTime"
          );
        } else {
          throw new Error("Gagal mengirim data ke API");
        }

        return response.data;
      } catch (error) {
        console.error("Terjadi kesalahan:", error);
      }
    }

    postDataToAPI(dataToSend);
    // console.log(dataToSend);

    // END MENYIMPAN DATA KE API
  };

  return (
    <form onSubmit={handleSubmit}>
      <div
        id="headPosting"
        className={`row ${addCardClass ? "card" : ""}`}
        style={{
          position: "sticky",
          top: "60px",
          zIndex: "99",
          paddingTop: "10px",
          marginRight: "-0",
          marginLeft: "0px",
        }}
      >
        <div className="col-xxl-12 col-md-12">
          <div className="info-card sales-card">
            <div className="d-flex justify-content-between align-items-center">
              <div
                className="btn btn-states rounded mr-2"
                title="Simpan Sebagai Draf"
              >
                <i className="bi bi-cloud-check">
                  {" "}
                  <span className="d-none-md"></span>
                </i>
                <i
                  className="text-success"
                  id="drafInfo"
                  style={{ fontSize: "12px" }}
                ></i>
              </div>
              <button
                type="submit"
                className="btn btn-primary rounded"
                title="Publish Artikel"
                style={{ backgroundColor: "#6776F4", color: "white" }}
              >
                <i className="ri-send-plane-fill">
                  {" "}
                  <span className="d-none-md">Submit</span>
                </i>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="row mt-3">
        <div className="col-xxl-12 col-md-12">
          <div className="card info-card sales-card p-2">
            <input
              type="text"
              name="judul"
              className="form-control"
              placeholder="Masukkan Judul"
              value={formData.judul}
              onChange={handleChange}
              onBlur={tidaFokuslagi}
            />
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-9">
          {/* <div className="row">
            <div className="col-xxl-12 col-md-12">
              <div className="card info-card sales-card p-0">
                <FileUploadCard formData={formData} />
              </div>
            </div>
          </div> */}

          <div className="row">
            <div className="col-xxl-12 col-md-12">
              <div className="" style={{ height: "800px", overflow: "hidden" }}>
                <FileUploadMediaContent
                  formData={formData}
                  setFormData={setFormData}
                />

                <QuillEditor
                  modules={modules}
                  value={formData.quillContent}
                  onChange={handleQuillChange}
                  onBlur={tidaFokuslagi}
                  style={{
                    width: "100%",
                    height: "100%",
                    backgroundColor: "white",
                    margin: "0",
                    marginTop: "-20px",
                    border: "none",
                    padding: "10px",
                    scrollbarColor: "darkgray lightgray",
                    scrollbarWidth: "auto",
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="col-lg-3">
          <div className="col-xxl-12 col-md-12">
            <div className="card info-card sales-card p-2">
              <h4>Thumbnail</h4>
              <div className="row p-3">
                <FileUploadCard formData={formData} />
              </div>
            </div>
          </div>

          <div className="col-xxl-12 col-md-12">
            <div className="card info-card sales-card p-2">
              <h4>Menu</h4>
              <hr />
              <div className="row">
                <div className="col-lg-2">
                  <label>Pilih</label>
                </div>
                <div className="col-lg-10">
                  <select
                    name="menu"
                    id="menu"
                    className="form-control"
                    value={formData.menu}
                    onBlur={tidaFokuslagi}
                    onChange={(e) =>
                      handleChangeMenu(
                        e.target.value,
                        e.target.selectedOptions[0].getAttribute("data-id")
                      )
                    }
                  >
                    <option disabled>--Pilih menu--</option>
                    {dataMenu.map((item) => (
                      <option key={item.id} value={item.id} data-id={item.id}>
                        {item.title}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              {dataSubMenu.length > 0 ? (
                <div className="row">
                  <div className="col-lg-3"></div>
                  <div className="col-lg-1">
                    <span
                      className="bi bi-arrow-return-right float-right"
                      style={{ fontSize: "30px" }}
                    ></span>
                  </div>
                  <div className="col-lg-8">
                    <select
                      name="type_konten"
                      id="type_konten"
                      className="form-control"
                      value={formData.type_konten}
                      onBlur={tidaFokuslagi}
                      onChange={handleChange}
                      // onChange={(e) =>
                      //   handleChangesubmenu(
                      //     e.target.value,
                      //     e.target.selectedOptions[0].getAttribute("data-id")
                      //   )
                      // }
                    >
                      <option disabled>++ Pilih Sub menu ++</option>
                      {dataSubMenu.map((item) => (
                        <option key={item.id} value={item.title}>
                          {item.title}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              ) : null}
            </div>
          </div>

          <div className="col-xxl-12 col-md-12">
            <div className="card info-card sales-card p-2">
              <div className="accordion" id="accordionExample">
                <div className="accordion-item">
                  <h2 className="accordion-header" id="headingOne">
                    <button
                      className="accordion-button"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseTwo"
                      aria-expanded="true"
                      aria-controls="collapseTwo"
                    >
                      <b>Kategori</b>
                    </button>
                  </h2>
                  <div
                    id="collapseTwo"
                    className="accordion-collapse collapse show"
                    aria-labelledby="headingOne"
                    data-bs-parent="#accordionExample"
                  >
                    <div className="accordion-body">
                      <div className="row">
                        <div className="col-lg-2">
                          <label>Pilih</label>
                        </div>
                        <div className="col-lg-10">
                          <select
                            name="kategori"
                            id="kategori"
                            className="form-control"
                            value={formData.kategori}
                            onChange={handleChange}
                            onBlur={tidaFokuslagi}
                          >
                            <option readOnly>--Pilih Kategori--</option>
                            {dataKategori.map((item) => (
                              <option
                                key={item.id_kategori}
                                value={item.nama_kategori}
                              >
                                {item.nama_kategori}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-xxl-12 col-md-12">
            <div className="card info-card sales-card p-2">
              <div className="accordion" id="accordionExample">
                <div className="accordion-item">
                  <h2 className="accordion-header" id="headingOne">
                    <button
                      className="accordion-button"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseOne"
                      aria-expanded="true"
                      aria-controls="collapseOne"
                    >
                      <b>Tags</b>
                    </button>
                  </h2>
                  <div
                    id="collapseOne"
                    className="accordion-collapse collapse show"
                    aria-labelledby="headingOne"
                    data-bs-parent="#accordionExample"
                  >
                    <div className="accordion-body">
                      <TagInput
                        type="text"
                        id="Tags"
                        className="form-control"
                        value={tags}
                        onChange={handleTagsChange}
                        onBlur={tidaFokuslagi}
                      />
                      <span
                        className="text-success"
                        style={{
                          position: "absolute",
                          fontSize: "8pt",
                          marginTop: "0px",
                        }}
                      >
                        <i>Tekan enter untuk add Tag</i>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-xxl-12 col-md-12">
            <div className="card info-card sales-card p-2">
              <div className="accordion" id="accordionExample">
                <div className="accordion-item">
                  <h2 className="accordion-header" id="headingOne">
                    <button
                      className="accordion-button"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseTwo"
                      aria-expanded="true"
                      aria-controls="collapseTwo"
                    >
                      <b>Slug</b>
                    </button>
                  </h2>
                  <div
                    id="collapseTwo"
                    className="accordion-collapse collapse show"
                    aria-labelledby="headingOne"
                    data-bs-parent="#accordionExample"
                  >
                    <div className="accordion-body">
                      <input id="slugg" className="form-control" readOnly />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-xxl-12 col-md-12">
            <div className="card info-card sales-card p-2">
              <div className="accordion" id="accordionExample">
                <div className="accordion-item">
                  <h2 className="accordion-header" id="headingOne">
                    <button
                      className="accordion-button"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapse3"
                      aria-expanded="true"
                      aria-controls="collapse3"
                    >
                      <b>Keterangan</b>
                    </button>
                  </h2>
                  <div
                    id="collapse3"
                    className="accordion-collapse collapse show"
                    aria-labelledby="headingOne"
                    data-bs-parent="#accordionExample"
                  >
                    <div className="accordion-body">
                      <div className="container mt-2">
                        Draf : <b id="ketDraf">Belum Tersimpan</b>
                      </div>
                      <div className="container mt-2">
                        Visibilitas : <b id="ketPublic">Private</b>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default MyForm;
