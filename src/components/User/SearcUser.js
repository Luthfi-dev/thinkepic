import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import ListItemText from "@mui/material/ListItemText";
import ListItem from "@mui/material/ListItem";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import Slide from "@mui/material/Slide";
import axios from "axios";
import { searchUser } from "../../../utils/globals";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function FullScreenDialog() {
  const [open, setOpen] = React.useState(false);
  const [searchResults, setSearchResults] = React.useState([]);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [searched, setSearched] = React.useState(false); // Menyimpan status pencarian

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSearched(false); // Reset status pencarian saat dialog ditutup
    setSearchQuery(""); // Reset query pencarian saat dialog ditutup
  };

  const handleSearch = async () => {
    try {
      const response = await axios.get(`${searchUser}?search=${searchQuery}`);
      setSearchResults(response.data);
      setSearched(true); // Set status pencarian setelah pencarian dilakukan
    } catch (error) {
      console.error("Error searching:", error);
    }
  };

  return (
    <div>
      <span variant="outlined" onClick={handleClickOpen}>
        <i className="bi bi-search"></i>
      </span>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
        style={{ zIndex: "9999" }}
        className="bg-app"
      >
        <AppBar sx={{ position: "relative" }} className="bg-app">
          <Toolbar>
            <b>
              <span
                edge="start"
                color="inherit"
                className="bi bi-chevron-left"
                onClick={handleClose}
                aria-label="close"
              ></span>
            </b>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  autoFocus
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyUp={(e) => {
                    if (e.key === "Enter") {
                      handleSearch();
                    }
                  }}
                />
                <span className="input-group-text" onClick={handleSearch}>
                  <i className="bi bi-search"></i>
                </span>
              </div>
            </Typography>
          </Toolbar>
        </AppBar>
        <List>
          {searched && searchResults.length === 0 ? (
            <Typography
              variant="h6"
              component="div"
              className="text-center mt-3"
            >
              Pencarian tidak ditemukan.
            </Typography>
          ) : (
            searchResults.map((result) => (
              <>
                <Link
                  href={`/view/${result.slug}`}
                  className="nav-link"
                  onClick={handleClose}
                >
                  <ListItem
                    button
                    key={result.id}
                    className="bg-app text-light"
                  >
                    <ListItemText primary={result.judul} />
                    <IconButton
                      className="text-light"
                      onClick={() => handleDetail(result.id)}
                    >
                      <span className="bi bi-eye"></span>
                    </IconButton>
                  </ListItem>
                  <Divider />
                </Link>
              </>
            ))
          )}
        </List>
      </Dialog>
    </div>
  );
}
