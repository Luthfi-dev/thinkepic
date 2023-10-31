// pages/admin.js
import Image from "next/image";
import React, { useState } from "react";

const AdminContent = () => {
const [isFileSelected, setIsFileSelected] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState([]); // Menggunakan array kosong untuk menyimpan multiple files

 const handleFileChange = (event) => {
  const files = event.target.files;
  setIsFileSelected(files.length > 0);
  setSelectedFiles([...files]);
};

  // Sesi upload file ke API media
const handleFileUpload = async () => {
  if (!selectedFiles.length) {
    alert("Pilih file terlebih dahulu");
    return;
  }

  const formData = new FormData();
  selectedFiles.forEach((file) => {
    formData.append("nama", file);
  });
  formData.append("user_id", "1");

  const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpcENsaWVudCI6IjEwMy41Mi4xNDQuMTQ4IiwiZm9sZGVyTmFtZSI6ImxvY2FsaG9zdCIsImlhdCI6MTY5MzMwMzg3Nn0.jHLPKJ9hAOjoX1a2n6lHqE5K_AeKF3RfX-Tf2b_NxBc";

  try {
    const response = await fetch("http://assets.bantuanteknis.org/epicmedia", {
      method: "POST",
      body: formData,
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      const data = await response.json();
      const { filename } = data;
      console.log("File berhasil diunggah:", filename);
      alert("Gambar berhasil diunggah ke API");
    } else {
      alert("Terjadi kesalahan saat mengunggah gambar");
    }
  } catch (error) {
    console.error("Terjadi kesalahan:", error);
  }
};



  return (
    <>
    <div className="pagetitle">
          <nav>
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <a href="/">Home</a>
              </li>
              <li className="breadcrumb-item active">Media</li>
            </ol>
          </nav>
        </div>
    {/* section kontent */}
    <section className="row">
        <div className="col-xxl-12 col-md-12">
            <div className="card info-card sales-card p-2">
            <div className="card-body">
              {/* <!-- Bordered Tabs Justified --> */}
              <ul className="nav nav-tabs nav-tabs-bordered d-flex" id="borderedTabJustified" role="tablist">
                <li className="nav-item flex-fill" role="presentation">
                  <button className="nav-link w-100 active" id="home-tab" data-bs-toggle="tab" data-bs-target="#bordered-justified-home" type="button" role="tab" aria-controls="image" aria-selected="true">Image</button>
                </li>
                <li className="nav-item flex-fill" role="presentation">
                  <button className="nav-link w-100" id="profile-tab" data-bs-toggle="tab" data-bs-target="#bordered-justified-profile" type="button" role="tab" aria-controls="videos" aria-selected="false" tabindex="-1">Videos</button>
                </li>
                <li className="nav-item flex-fill" role="presentation">
                  <button className="nav-link w-100" id="contact-tab" data-bs-toggle="tab" data-bs-target="#bordered-justified-contact" type="button" role="tab" aria-controls="upload" aria-selected="false" tabindex="-1">Upload</button>
                </li>
              </ul>
              <div className="tab-content pt-2" id="borderedTabJustifiedContent">
                <div className="tab-pane fade active show" id="bordered-justified-home" role="tabpanel" aria-labelledby="image-tab">
                  Sunt est soluta temporibus accusantium neque nam maiores cumque temporibus. Tempora libero non est unde veniam est qui dolor. Ut sunt iure rerum quae quisquam autem eveniet perspiciatis odit. Fuga sequi sed ea saepe at unde.
                </div>
                <div className="tab-pane fade" id="bordered-justified-profile" role="tabpanel" aria-labelledby="videos-tab">
                  Nesciunt totam et. Consequuntur magnam aliquid eos nulla dolor iure eos quia. Accusantium distinctio omnis et atque fugiat. Itaque doloremque aliquid sint quasi quia distinctio similique. Voluptate nihil recusandae mollitia dolores. Ut laboriosam voluptatum dicta.
                </div>
                <div className="tab-pane fade" id="bordered-justified-contact" role="tabpanel" aria-labelledby="upload-tab">
                    <div className="container mt-5">
                        <div className="row justify-content-center">
                            <div className="col-md-6">
                            <div className="card">
                                <div className="card-body">
                                <div className="text-center mb-3">
                                    {/* Logo Upload */}
                                    <Image src="/assets/img/logos-upload.png" width={200} height={200} objectFit="contain" alt="Logo Upload" className="img-fluid" />
                                </div>
                                <form>
                                    <div className="mb-3">
                                    <input type="file" name="nama" className="btn form-control btn-light" id="media" multiple onChange={handleFileChange} />
                                    </div>
                                    <button type="button" className="btn btn-dark w-100" onClick={handleFileUpload} disabled={!isFileSelected}>Upload</button>
                                </form>
                                </div>
                            </div>
                            </div>
                        </div>
                        </div>
                </div>

              {/* </div><!-- End Bordered Tabs Justified --> */}

            </div>
          </div>
          </div>
        </div>
    </section>
    </>
  );
}

export default AdminContent;

