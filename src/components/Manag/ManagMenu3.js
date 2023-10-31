import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const Menu = ({ menu, onDelete, onEdit, level }) => {
  const marginLeft = `${level * 20}px`;

  // Pastikan menu.position adalah integer
  const position = typeof menu.position === "number" ? menu.position : 0;

  return (
    <Draggable
      draggableId={menu.id ? menu.id.toString() : "unknown"}
      index={position}
    >
      {(provided) => (
        <div
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          style={{ ...provided.draggableProps.style, marginLeft }}
        >
          <div>
            <div>
              <strong>ID:</strong> {menu.id}
            </div>
            <div>
              <strong>Title:</strong> {menu.title}
            </div>
            <div>
              <Button variant="info" size="sm" onClick={() => onEdit(menu)}>
                Edit
              </Button>{" "}
              <Button
                variant="danger"
                size="sm"
                onClick={() => onDelete(menu.id)}
              >
                Delete
              </Button>
            </div>
          </div>
          {menu.submenu && menu.submenu.length > 0 && (
            <div style={{ marginLeft: "20px" }}>
              {menu.submenu.map((submenu) => (
                <Menu
                  key={submenu.id}
                  menu={submenu}
                  onDelete={onDelete}
                  onEdit={onEdit}
                  level={level + 1}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </Draggable>
  );
};

const MenuManager = () => {
  const [menus, setMenus] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    parent_id: null, // Tambahkan parent_id sebagai state
  });
  const [editFormData, setEditFormData] = useState({
    id: null,
    title: "",
  });
  const [showEditModal, setShowEditModal] = useState(false);

  useEffect(() => {
    fetchMenus();
  }, []);

  const fetchMenus = () => {
    fetch("https://ex.luth.my.id/menu/read-menu")
      .then((response) => response.json())
      .then((data) => setMenus(data))
      .catch((error) => console.error("Error fetching menus:", error));
  };

  const handleCreateMenu = () => {
    // Pastikan parent_id yang dikirim adalah null jika tidak ada yang dipilih
    const sendData = {
      title: formData.title,
      parent_id: formData.parent_id ? formData.parent_id : null,
    };

    fetch("https://ex.luth.my.id/menu/create-menu", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(sendData),
    })
      .then((response) => response.json())
      .then((newMenu) => {
        setMenus([...menus, newMenu]);
        setFormData({
          title: "",
          parent_id: null,
        });
      })
      .catch((error) => console.error("Error creating menu:", error));
  };

  const handleShowEditModal = (menu) => {
    setEditFormData(menu);
    setShowEditModal(true);
  };

  const handleCloseEditModal = () => {
    setShowEditModal(false);
  };

  const handleEditMenu = () => {
    fetch(`https://ex.luth.my.id/menu/update-menu/${editFormData.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(editFormData),
    })
      .then(() => {
        const updatedMenus = menus.map((menu) =>
          menu.id === editFormData.id ? editFormData : menu
        );
        setMenus(updatedMenus);
        handleCloseEditModal();
      })
      .catch((error) => console.error("Error updating menu:", error));
  };

  const handleDeleteMenu = (menuId) => {
    fetch(`https://ex.luth.my.id/menu/delete-menu/${menuId}`, {
      method: "DELETE",
    })
      .then(() => {
        const updatedMenus = menus.filter((menu) => menu.id !== menuId);
        setMenus(updatedMenus);
      })
      .catch((error) => console.error("Error deleting menu:", error));
  };

  const onDragEnd = (result) => {
    if (!result.destination) return;

    const updatedMenus = [...menus];
    const [movedItem] = updatedMenus.splice(result.source.index, 1);
    updatedMenus.splice(result.destination.index, 0, movedItem);

    // Update positions based on the new order
    updatedMenus.forEach((menu, index) => {
      menu.position = index;
    });

    setMenus(updatedMenus);

    // Update positions in the database
    fetch("https://ex.luth.my.id/menu/update-positions", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedMenus),
    })
      .then(() => console.log("Positions updated successfully"))
      .catch((error) => console.error("Error updating positions:", error));
  };

  // Function to group menus into a hierarchical structure
  const groupMenusByParentId = (menuList) => {
    const groupedMenus = {};

    menuList.forEach((menu) => {
      if (!menu.parent_id) {
        if (!groupedMenus[menu.id]) {
          groupedMenus[menu.id] = { ...menu, submenu: [] };
        } else {
          groupedMenus[menu.id] = {
            ...menu,
            submenu: groupedMenus[menu.id].submenu,
          };
        }
      } else {
        if (!groupedMenus[menu.parent_id]) {
          groupedMenus[menu.parent_id] = { submenu: [] };
        }
        groupedMenus[menu.parent_id].submenu.push(menu);
      }
    });

    return Object.values(groupedMenus);
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Menu Manager</h1>

      <div className="row">
        <div className="col-md-6">
          <h2>Create Menu</h2>
          <Form>
            <Form.Group controlId="title">
              <Form.Label>Title:</Form.Label>
              <Form.Control
                type="text"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group controlId="parent_id">
              <Form.Label>Parent Menu:</Form.Label>
              <Form.Control
                as="select"
                value={formData.parent_id || ""}
                onChange={(e) =>
                  setFormData({ ...formData, parent_id: e.target.value })
                }
              >
                <option value="">None</option>
                {menus.map((menu) => (
                  <option key={menu.id} value={menu.id}>
                    {menu.title}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
            <Button variant="primary" onClick={handleCreateMenu}>
              Create
            </Button>
          </Form>
        </div>

        <div className="col-md-6">
          <h2>Menu List</h2>
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="menu-list">
              {(provided) => (
                <div ref={provided.innerRef} {...provided.droppableProps}>
                  {groupMenusByParentId(menus).map((menu, index) => (
                    <Menu
                      key={menu.id}
                      menu={menu}
                      onDelete={handleDeleteMenu}
                      onEdit={handleShowEditModal}
                      level={0}
                    />
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </div>
      </div>

      <Modal show={showEditModal} onHide={handleCloseEditModal}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Menu</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="edit-title">
              <Form.Label>Title:</Form.Label>
              <Form.Control
                type="text"
                value={editFormData.title}
                onChange={(e) =>
                  setEditFormData({ ...editFormData, title: e.target.value })
                }
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseEditModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleEditMenu}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default MenuManager;
