import React, { useEffect, useState } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Link from 'next/link';
import axios from 'axios';

const Nav2 = () => {
  const [val, setVal] = useState(0);
  const [anchorEl, setAnchorEl] = useState(null);
  const [menus, setMenus] = useState([]);

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


  const categories = menus;

  const parentCategories = categories.filter((category) => !category.parent_id);
  const childCategories = categories.filter((category) => category.parent_id);

  // console.log("ini parent", parentCategories);
  // console.log("ini child", childCategories);

  const handleTab = (event, newValue) => {
    setVal(newValue);
  };

  const handleMenuOpen = (event, parentCategoryId) => {
    setVal(parentCategoryId);
    setAnchorEl({ [parentCategoryId]: event.currentTarget });
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Tabs
        value={val}
        onChange={handleTab}
        variant="scrollable"
        scrollButtons="auto"
        aria-label="scrollable auto tabs example"
        style={{ boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.2)" }}
        className="silver-app"
      >
        {parentCategories.map((parentCategory, index) => (
          <div key={index}>
            <Tab
              label={parentCategory.url !== "" ? (
                  <Link className="nav-link color-app" href={parentCategory.url}>{parentCategory.title}</Link>
                ) : (
                  <span>{parentCategory.title}</span>
                )}
              aria-owns={anchorEl ? 'simple-menu' : undefined}
              aria-haspopup="true"
              indicatorColor="primary"
              textColor="primary"
              onClick={(event) => handleMenuOpen(event, parentCategory.id)}
              className={val === parentCategory.id ? 'active color-app' : ''}
            />
            {childCategories.some(childCategory => childCategory.parent_id === parentCategory.id) && (
              <Menu
                id="simple-menu"
                anchorEl={anchorEl ? anchorEl[parentCategory.id] : null}
                open={Boolean(anchorEl) && Boolean(anchorEl[parentCategory.id])}
                onClose={handleMenuClose}
              >
                {childCategories
                  .filter((childCategory) => childCategory.parent_id === parentCategory.id)
                  .map((childCategory, childIndex) => (
                    <div key={childIndex}>
                      {
                        childCategory.parent_id === parentCategory.id ? (
                          <MenuItem onClick={handleMenuClose}>
                            <Link className="nav-link color-app" href={`/p/${childCategory.url}`} >{childCategory.title}</Link>
                          </MenuItem>
                        ) : null
                      }
                    </div>
                  ))
                }
              </Menu>
            )}
          </div>
        ))}
      </Tabs>
    </div>
  );
};

export default Nav2;
