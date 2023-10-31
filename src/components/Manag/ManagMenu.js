import React, { useState, useEffect } from "react";
import axios from "axios";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const MenuManagement = () => {
  const [menus, setMenus] = useState([]);
  const [formData, setFormData] = useState({
    parent_id: 0,
    title: "",
    link: "",
    position: 0,
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editMenuId, setEditMenuId] = useState(null);

  useEffect(() => {
    // Ambil data menu dari API saat komponen dimuat
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://ex.luth.my.id/menu/read-menu"
        );
        setMenus(response.data);
      } catch (error) {
        console.error("Terjadi kesalahan dalam mengambil data menu:", error);
      }
    };

    fetchData();
  }, []);

  const handleAddMenu = async () => {
    try {
      const response = await axios.post(
        "https://ex.luth.my.id/menu/create-menu",
        formData
      );
      setMenus([...menus, response.data]);
      clearFormData();
    } catch (error) {
      console.error("Terjadi kesalahan dalam menambahkan menu:", error);
    }
  };

  const handleEditMenu = async () => {
    try {
      const response = await axios.put(
        `https://ex.luth.my.id/menu/update-menu/${editMenuId}`,
        formData
      );
      const updatedMenus = menus.map((menu) =>
        menu.id === editMenuId ? response.data : menu
      );
      setMenus(updatedMenus);
      clearFormData();
      setEditMenuId(null);
      setIsEditing(false);
    } catch (error) {
      console.error("Terjadi kesalahan dalam mengedit menu:", error);
    }
  };

  const handleDeleteMenu = async (id) => {
    try {
      await axios.delete(`https://ex.luth.my.id/menu/delete-menu/${id}`);
      const updatedMenus = menus.filter((menu) => menu.id !== id);
      setMenus(updatedMenus);
    } catch (error) {
      console.error("Terjadi kesalahan dalam menghapus menu:", error);
    }
  };

  const handleEditClick = (menu) => {
    setFormData({
      parent_id: menu.parent_id,
      title: menu.title,
      link: menu.link,
      position: menu.position,
    });
    setEditMenuId(menu.id);
    setIsEditing(true);
  };

  const clearFormData = () => {
    setFormData({
      parent_id: 0,
      title: "",
      link: "",
      position: 0,
    });
  };

  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const reorderedMenus = Array.from(menus);
    const [reorderedMenu] = reorderedMenus.splice(result.source.index, 1);
    reorderedMenus.splice(result.destination.index, 0, reorderedMenu);

    // Kirim permintaan PUT ke API untuk memperbarui urutan menu
    axios
      .put("https://ex.luth.my.id/menu/update-menu-order", reorderedMenus)
      .then(() => {
        setMenus(reorderedMenus);
      })
      .catch((error) => {
        console.error("Terjadi kesalahan dalam mengupdate urutan menu:", error);
      });
  };

  return (
    <div className="container mt-5">
      <h2>Menu Management</h2>
      <div className="row mb-3">
        <div className="col-3">
          <input
            type="text"
            className="form-control"
            placeholder="Menu Title"
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
          />
        </div>
        <div className="col-3">
          <input
            type="text"
            className="form-control"
            placeholder="Menu Link"
            value={formData.link}
            onChange={(e) => setFormData({ ...formData, link: e.target.value })}
          />
        </div>
        <div className="col-2">
          <input
            type="number"
            className="form-control"
            placeholder="Menu Position"
            value={formData.position}
            onChange={(e) =>
              setFormData({ ...formData, position: e.target.value })
            }
          />
        </div>
        <div className="col-2">
          {isEditing ? (
            <button className="btn btn-success" onClick={handleEditMenu}>
              Edit Menu
            </button>
          ) : (
            <button className="btn btn-primary" onClick={handleAddMenu}>
              Add Menu
            </button>
          )}
          <button
            className="btn btn-secondary ml-2"
            onClick={() => {
              clearFormData();
              setIsEditing(false);
            }}
          >
            Cancel
          </button>
        </div>
      </div>
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="menu-list" type="MENU">
          {(provided) => (
            <ul
              className="list-group"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {menus.map((menu, index) => (
                <Draggable
                  key={menu.id?.toString() ?? index.toString()} // Menggunakan operator nullish
                  draggableId={menu.id?.toString() ?? index.toString()} // Menggunakan operator nullish
                  index={index}
                >
                  {(provided) => (
                    <li
                      className="list-group-item d-flex justify-content-between align-items-center"
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      {menu.title}
                      <div>
                        <button
                          className="btn btn-primary btn-sm"
                          onClick={() => handleEditClick(menu)}
                        >
                          Edit
                        </button>
                        <button
                          className="btn btn-danger btn-sm ml-2"
                          onClick={() => handleDeleteMenu(menu.id)}
                        >
                          Delete
                        </button>
                      </div>
                    </li>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </ul>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default MenuManagement;
