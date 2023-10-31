import React, { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import axios from "axios";

function MenuManagement() {
  const [menus, setMenus] = useState([]);
  const [newMenuTitle, setNewMenuTitle] = useState("");
  const [newMenuLink, setNewMenuLink] = useState("");

  useEffect(() => {
    fetchMenus();
  }, []);

  const fetchMenus = async () => {
    try {
      const response = await axios.get("https://ex.luth.my.id/menus"); // Ubah URL sesuai dengan endpoint server Anda
      setMenus(response.data);
    } catch (error) {
      console.error("Error fetching menus:", error);
    }
  };

  const onDragEnd = async (result) => {
    if (!result.destination) return;

    const updatedMenus = [...menus];
    const [movedMenu] = updatedMenus.splice(result.source.index, 1);
    updatedMenus.splice(result.destination.index, 0, movedMenu);

    try {
      await axios.put(`https://ex.luth.my.id/menus/${movedMenu.id}`, {
        position: result.destination.index + 1, // Sesuaikan position sesuai dengan kebutuhan Anda
      });
      setMenus(updatedMenus);
    } catch (error) {
      console.error("Error updating menu position:", error);
    }
  };

  const addMenu = async () => {
    if (!newMenuTitle || !newMenuLink) return;

    try {
      const response = await axios.post("https://ex.luth.my.id/menus", {
        title: newMenuTitle,
        link: newMenuLink,
      });

      setMenus([...menus, response.data]);
      setNewMenuTitle("");
      setNewMenuLink("");
    } catch (error) {
      console.error("Error adding menu:", error);
    }
  };

  const deleteMenu = async (id) => {
    try {
      await axios.delete(`https://ex.luth.my.id/menus/${id}`);
      const updatedMenus = menus.filter((menu) => menu.id !== id);
      setMenus(updatedMenus);
    } catch (error) {
      console.error("Error deleting menu:", error);
    }
  };

  return (
    <div>
      <h1>Menu Management</h1>
      <div>
        <input
          type="text"
          placeholder="Title"
          value={newMenuTitle}
          onChange={(e) => setNewMenuTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Link"
          value={newMenuLink}
          onChange={(e) => setNewMenuLink(e.target.value)}
        />
        <button onClick={addMenu}>Add Menu</button>
      </div>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="menu-list">
          {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              {menus.map((menu, index) => (
                <Draggable
                  key={menu.id}
                  draggableId={menu.id.toString()}
                  index={index}
                >
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <div>
                        <button onClick={() => deleteMenu(menu.id)}>
                          Delete
                        </button>
                      </div>
                      <div>
                        <strong>{menu.title}</strong>
                        <a
                          href={menu.link}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {menu.link}
                        </a>
                      </div>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}

export default MenuManagement;
