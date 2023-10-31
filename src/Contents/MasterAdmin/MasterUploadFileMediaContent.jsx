import Image from "next/image";
import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import SelectImage from "./MasterAdminMediaForContent";
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
    // setShowModal(false);
    setSelectedFile(true)
  }

  const handleDeleteImage = () => {
    setSelectedFile(null);
  };

  // const imageList = ['1.jpg','2.jpg'];

  return (
    <div>
          <span
                  onClick={openModal} 
                  // type="button"
                  // onClick={insertImage}
                  className="btn btn-app btn-sm"
                  style={{
                    position: "relative",
                    marginBottom: "-45px",
                    marginLeft: "5px",
                  }}
                >
                  + <span className="bi bi-image"></span>
          </span>

      <Modal show={showModal} onHide={closeModal} className="modal-xl" style={{zIndex:"9999"}}>
        <Modal.Header closeButton>
          <Modal.Title>Select Thumbnail</Modal.Title>
        </Modal.Header>
        <Modal.Body onClick={handleImageClick}>
          {/* <center className="text-danger">{!selectedFile ? "Belum ada Media, Klik Upload" : null}</center> */}
          <SelectImage kData={formData} setKData={setFormData} modal={setShowModal} />
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
