// components/SitemapMenu.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";

function SitemapMenu() {
  const [menus, setMenus] = useState([]);
  const [newMenu, setNewMenu] = useState({
    title: "",
    url: "",
    parent_id: null, // Menggunakan null untuk menu utama
    position: "",
  });
  const [parentMenus, setParentMenus] = useState([]);

  // Ambil data sitemap menu dari server
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get("https://ex.luth.my.id/sitemap_menus");
        setMenus(response.data);
      } catch (error) {
        console.error("Gagal mengambil data sitemap menu:", error);
      }
    }
    fetchData();
  }, []);

  // Ambil data parent menus untuk opsi pemilihan parent
  useEffect(() => {
    setParentMenus(menus.filter((menu) => menu.parent_id === null));
  }, [menus]);

  // Handle penambahan menu baru
  const handleAddMenu = async () => {
    try {
      await axios.post("https://ex.luth.my.id/sitemap_menus", newMenu);
      // Ambil ulang data sitemap menu setelah menambahkan
      const response = await axios.get("https://ex.luth.my.id/sitemap_menus");
      setMenus(response.data);
      setNewMenu({ title: "", url: "", parent_id: null, position: "" });
    } catch (error) {
      console.error("Gagal menambahkan menu:", error);
    }
  };

  // Handle perubahan input menu baru
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewMenu({ ...newMenu, [name]: value });
  };

  // Handle penghapusan menu berdasarkan ID
  const handleDeleteMenu = async (menuId) => {
    try {
      await axios.delete(`https://ex.luth.my.id/sitemap_menus/${menuId}`);
      // Ambil ulang data sitemap menu setelah menghapus
      const response = await axios.get("https://ex.luth.my.id/sitemap_menus");
      setMenus(response.data);
    } catch (error) {
      console.error("Gagal menghapus menu:", error);
    }
  };

  // Fungsi rekursif untuk mengatur menu-menu menjadi hirarkis
  const organizeMenus = (parentId) => {
    const organized = menus.filter((menu) => menu.parent_id === parentId);
    return organized.map((menu) => ({
      ...menu,
      submenu: organizeMenus(menu.id),
    }));
  };

  // Membuat struktur hirarkis menu
  const hierarchicalMenus = organizeMenus(null);

  // Komponen untuk menampilkan menu dalam bentuk hirarki
  const renderMenu = (menu) => (
    <div className="col-md-6">
      <li key={menu.id} style={{ margin: "10px 0" }}>
        {/* <span>--</span> */}
        <span className="btn btn-warning btn-sm">
          {menu.title} - <Link href={menu.url}>{menu.url}</Link> {"  "}
          <span onClick={() => handleDeleteMenu(menu.id)}>
            <span className="bi bi-trash"></span>
          </span>
        </span>

        {menu.submenu.length > 0 && (
          <ul>{menu.submenu.map((submenu) => renderMenu(submenu))}</ul>
        )}
      </li>
    </div>
  );

  return (
    <>
      <div>
        <h1>List All Menu</h1>
        <ul>{hierarchicalMenus.map((menu) => renderMenu(menu))}</ul>
        <hr />
        <h4>Add New</h4>
        <div className="row mb-5">
          <div className="col-md-2">
            <input
              type="text"
              className="form-control"
              placeholder="Title"
              name="title"
              value={newMenu.title}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-3">
            <input
              type="text"
              className="form-control"
              placeholder="URL"
              name="url"
              value={newMenu.url}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-3">
            <select
              name="parent_id"
              className="form-control"
              value={newMenu.parent_id === null ? "" : newMenu.parent_id} // Ubah nilai null menjadi string kosong
              onChange={handleChange}
            >
              <option value="">Pilih Parent Menu (optional)</option>
              {parentMenus.map((parentMenu) => (
                <option key={parentMenu.id} value={parentMenu.id}>
                  {parentMenu.title}
                </option>
              ))}
            </select>
          </div>
          <div className="col-md-2">
            <input
              type="text"
              className="form-control"
              placeholder="Position"
              name="position"
              value={newMenu.position}
              onChange={handleChange}
            />
          </div>
          <br />
          <div className="col-md-2">
            <button className="btn btn-warning" onClick={handleAddMenu}>
              + Tambah Menu
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default SitemapMenu;
