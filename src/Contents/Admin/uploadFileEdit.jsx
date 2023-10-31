import Image from "next/image";
import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import SelectImage from "./AdminMediaForArticel";
import { linkApi, publicApi } from "../../../utils/globals";

const FileUploadCard = ({ formData, setFormData }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handleImageClick = () => {
      setSelectedFile(true);
  }

const handleDeleteImage = () => {
  setFormData((prevData) => ({ ...prevData, media: "" }));
};


  return (
    <div className="file-upload-card p-3 text-center">
      <label htmlFor="file-upload" className="upload-button">
        {!formData.media ? (
          <b>
            <Image src="/assets/svg/upload.svg" width={300} height={150} objectFit="contain" onClick={openModal} alt="logo upload postingan" />
            <label className="bg-light w-100"><b>Select file</b></label>
          </b>
        ) : (
          <div className="selected-image" style={{height:"150px"}}>
            {formData.media.endsWith('.jpg') || formData.media.endsWith('.png') ? (
              // Jika formData.media adalah gambar (contoh: .jpg atau .png)
              <Image
                src={`${publicApi}/${formData.media}`}
                alt="select media for content"
                layout="fill"
                style={{borderRadius:"10px"}}
              />
            ) : formData.media.endsWith('.mp4') ? (
              // Jika formData.media adalah video (contoh: .mp4)
              <div>
                <video controls className="d-md-none" width="200">
                  <source src={`${publicApi}/${formData.media}`} />
                  Maaf, browser Anda tidak mendukung video ini.
                </video>
                <video controls className="d-none d-md-block" width="600">
                  <source src={`${publicApi}/${formData.media}`} />
                  Maaf, browser Anda tidak mendukung video ini.
                </video>
              </div>
            ) : (
              // Jika formData.media adalah jenis lain atau tidak ada media yang dipilih
              <p>Tidak ada media yang dipilih</p>
            )}
            <button
              className="close-icon"
              onClick={() => handleDeleteImage()}
            >
              &#10006;
            </button>
          </div>
        )}
      </label>

      <Modal show={showModal} onHide={closeModal} className="modal-xl" style={{zIndex:"999999999"}}>
        <Modal.Header closeButton>
          <Modal.Title>Select Media</Modal.Title>
        </Modal.Header>
        <Modal.Body onClick={handleImageClick}>
          <SelectImage kData={formData} modal={setShowModal} onImageSelect={(newImage) => onImageChange(newImage)} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      <style jsx>{`
        .file-upload-card {
          border: 2px dashed #ccc;
          border-radius: 10px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }

        .selected-image img {
          max-width: 300px;
          height: auto;
          border: 2px solid #ccc;
        }

        .close-icon {
          position: absolute;
          top: -10px;
          right: -10px;
          background-color: red;
          color: white;
          border: none;
          border-radius: 50%;
          cursor: pointer;
          font-size: 12px;
          width: 30px;
          height: 30px;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0;
        }
      `}</style>
    </div>
  );
};

export default FileUploadCard;
