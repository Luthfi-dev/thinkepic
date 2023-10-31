import React, { useState, useEffect } from "react";
import { Container, Button, ListGroup, Modal, Form } from "react-bootstrap";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const Home = () => {
  const [menuData, setMenuData] = useState([]);
  const [visible, setVisible] = useState(false);
  const [formData, setFormData] = useState({ title: "", parent_id: null });

  // Mengambil data menu dari API saat komponen dimuat
  useEffect(() => {
    fetch("https://ex.luth.my.id/menu/read-menu")
      .then((response) => response.json())
      .then((data) => setMenuData(data));
  }, []);

  const handleDragEnd = (result) => {
    // Mengambil data menu yang diurutkan berdasarkan urutan saat ini
    const updatedMenuData = [...menuData];
    const [reorderedItem] = updatedMenuData.splice(result.source.index, 1);
    updatedMenuData.splice(result.destination.index, 0, reorderedItem);

    // Log data sebelum pengurutan
    console.log("Data Sebelum Pengurutan:", menuData);

    // Log data setelah pengurutan
    console.log("Data Setelah Pengurutan:", updatedMenuData);

    // Mengirim permintaan ke backend untuk menyimpan perubahan urutan menu
    fetch("https://ex.luth.my.id/menu/update-positions", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedMenuData),
    })
      .then((response) => response.json())
      .then((data) => {
        // Jika berhasil disimpan, perbarui state menuData
        setMenuData(updatedMenuData);

        // Log data setelah permintaan PUT berhasil
        console.log("Data Setelah Permintaan PUT:", updatedMenuData);
      })
      .catch((error) => {
        // Log jika terjadi kesalahan dalam permintaan PUT
        console.error("Kesalahan dalam Permintaan PUT:", error);
      });
  };

  const handleCreate = () => {
    // Mengirim permintaan ke backend untuk membuat menu baru
    fetch("https://ex.luth.my.id/menu/create-menu", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        // Jika berhasil dibuat, tambahkan menu baru ke state menuData
        setMenuData([...menuData, { id: data.id, ...formData }]);
        setFormData({ title: "", parent_id: null });
        setVisible(false);
      });
  };

  return (
    <Container>
      <h1>Manajemen Menu</h1>
      <Button variant="primary" onClick={() => setVisible(true)}>
        Tambahkan Menu
      </Button>

      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="menu">
          {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              <ListGroup>
                {menuData.map((menu, index) => (
                  <Draggable
                    key={menu.id}
                    draggableId={menu.id ? menu.id.toString() : `menu-${index}`}
                    index={index}
                  >
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <ListGroup.Item>{menu.title}</ListGroup.Item>
                      </div>
                    )}
                  </Draggable>
                ))}
              </ListGroup>
            </div>
          )}
        </Droppable>
      </DragDropContext>

      <Modal show={visible} onHide={() => setVisible(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Tambahkan Menu</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="title">
              <Form.Label>Judul Menu</Form.Label>
              <Form.Control
                type="text"
                placeholder="Masukkan judul menu"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
              />
            </Form.Group>
            {/* Tambahan: Input untuk parent_id jika Anda ingin menambahkan submenu */}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setVisible(false)}>
            Batal
          </Button>
          <Button variant="primary" onClick={handleCreate}>
            Tambahkan
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default Home;
