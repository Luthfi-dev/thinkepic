import ArrowRightIcon from "@heroicons/react/24/solid/ArrowRightIcon";
import EllipsisVerticalIcon from "@heroicons/react/24/solid/EllipsisVerticalIcon";
import { useEffect, useState } from "react";
import axios from "axios";
import { artikelUser, publicApi } from "../../../utils/globals";
import Typography from "@mui/material/Typography";
import InfiniteScroll from "react-infinite-scroll-component"; // Import InfiniteScroll

import {
  Box,
  Button,
  Card,
  CardActions,
  CardHeader,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  SvgIcon,
} from "@mui/material";

export const CardArtikel = () => {
  const [artikels, setArtikels] = useState([]);
  const [hasMore, setHasMore] = useState(true); // State untuk menentukan apakah masih ada data yang akan dimuat
  const [page, setPage] = useState(1); // State untuk melacak halaman data
  const [viewAllData, setViewAllData] = useState("&jumlah=1"); // State untuk viewAll

  async function fetchData() {
    try {
      const response = await axios.get(
        `${artikelUser}${viewAllData}&status=diterima`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = response.data;
      const postinganTeratas = data.data;
      console.log("postingg", postinganTeratas);

      if (page > 1) {
        // Jika tidak ada data lagi, set hasMore menjadi false
        setHasMore(false);
      } else {
        // Jika masih ada data, tambahkan data ke daftar yang sudah ada
        setArtikels([...artikels, ...postinganTeratas]);
      }

      setPage(page + 1);
    } catch (error) {
      console.error("Terjadi kesalahan saat mengambil data dari API:", error);
    }
  }

  useEffect(() => {
    fetchData();
  }, [viewAllData]);

  // Fungsi untuk view all
  function viewAll() {
    setViewAllData("&jumlah=all");
    console.log("page", page);
    setPage(0);
  }

  function filterHTMLTags(text) {
    // Menghilangkan tag HTML menggunakan regex
    return text.replace(/<\/?[^>]+(>|$)/g, "");
  }

  const potongDiSpasi = (text, maxLength) => {
    if (text.length <= maxLength) {
      return text;
    }

    // Cari posisi spasi terdekat sebelum maxLength
    const lastSpaceIndex = text.lastIndexOf(" ", maxLength);

    // Jika ada spasi, potong hingga spasi tersebut
    if (lastSpaceIndex !== -1) {
      return text.substring(0, lastSpaceIndex) + "..";
    } else {
      // Jika tidak ada spasi, potong pada maxLength dan tambahkan elipsis
      return text.substring(0, maxLength) + "..";
    }
  };

  return (
    <InfiniteScroll
      dataLength={artikels.length}
      next={fetchData}
      hasMore={hasMore}
      loader={<h4>Loading...</h4>} // Tampilkan loader saat data dimuat
    >
      <Card>
        <CardHeader
          title="New Artikel"
          style={{
            height: "50px",
            width: "100%",
            background: "url(/assets/svg/component/label-header.svg)",
            color: "white",
            marginLeft: "-5px",
          }}
        />
        <List className="p-2">
          {artikels.map((artikel, index) => {
            const hasDivider = index < artikels.length - 1;
            const ago = "777";
            let imageSrc = "";

            // Mendapatkan ekstensi file foto dari nama file
            const fotoEkstensi = artikel.media
              ? artikel.media.split(".").pop().toLowerCase()
              : "";

            // Periksa jenis artikel berdasarkan ekstensi file
            if (["jpg", "jpeg", "png", "gif"].includes(fotoEkstensi)) {
              // Jika ekstensi adalah gambar
              imageSrc = `${publicApi}/${artikel.media}`;
            } else if (artikel.jenis === "video") {
              // Jika jenis adalah video
              imageSrc = `${publicApi}/default/thum_video.png`;
            } else {
              // Jika jenis tidak ada atau tidak sesuai, tampilkan gambar default
              imageSrc = `${publicApi}/default/no_picture.png`;
            }

            // Fungsi untuk menghitung waktu yang lalu
            const calculateTimeAgo = (updated_at) => {
              const createdTime = new Date(updated_at); // Parsing waktu dari string ISO 8601
              const currentTime = new Date(); // Waktu saat ini
              const diffInMilliseconds = currentTime - createdTime; // Selisih waktu dalam milidetik
              const diffInMinutes = Math.floor(
                diffInMilliseconds / (1000 * 60)
              ); // Selisih waktu dalam menit
              const diffInHours = Math.floor(diffInMinutes / 60); // Selisih waktu dalam jam
              const diffInDays = Math.floor(diffInHours / 24); // Selisih waktu dalam hari

              let timeAgoText;
              if (diffInDays === 0) {
                // Kurang dari 1 hari
                if (diffInHours === 0) {
                  // Kurang dari 1 jam
                  timeAgoText = `${diffInMinutes} minute ago`;
                } else {
                  timeAgoText = `${diffInHours} hour ago`;
                }
              } else if (diffInDays === 1) {
                timeAgoText = "1 day ago";
              } else {
                timeAgoText = `${diffInDays} days ago`;
              }

              return timeAgoText;
            };

            return (
              <ListItem divider={hasDivider} key={`${artikel.id}-${index}`}>
                <ListItemAvatar>
                  <Box
                    component="img"
                    src={imageSrc}
                    alt="Artikel Image"
                    sx={{
                      borderRadius: 1,
                      height: 100,
                      width: 100,
                      marginRight: 2,
                    }}
                  />
                </ListItemAvatar>
                <ListItemText
                  primary={
                    // Menggunakan Typography untuk mengatur judul menjadi h2 saat ukuran layar menjadi mobile
                    <Typography
                      style={
                        window.innerWidth <= 600
                          ? {
                              fontSize: "12pt",
                              fontWeight: "bold",
                              lineHeight: "1",
                              color: "#4352EF",
                            }
                          : {
                              fontSize: "16pt",
                              fontWeight: "bold",
                              lineHeight: "1",
                              color: "#4352EF",
                            }
                      }
                      gutterBottom
                    >
                      {potongDiSpasi(filterHTMLTags(artikel.judul), 50)}
                    </Typography>
                  }
                  secondary={
                    <>
                      {potongDiSpasi(filterHTMLTags(artikel.isi), 65)}
                      <br />
                      <span style={{ fontSize: "8pt" }}>
                        {calculateTimeAgo(artikel.updated_at)}
                      </span>
                    </>
                  }
                  secondaryTypographyProps={{ variant: "body2" }}
                />
                <Typography
                  variant="body2"
                  style={{
                    display: window.innerWidth > 600 ? "block" : "none",
                    textAlign: "right",
                  }}
                >
                  {/* Format waktu */}
                  {calculateTimeAgo(artikel.updated_at)}
                  {/* Akhir format waktu */}
                </Typography>
              </ListItem>
            );
          })}
        </List>
        <Divider />
        <CardActions sx={{ justifyContent: "flex-end" }}>
          <Button
            color="inherit"
            onClick={() => {
              viewAll();
            }}
            endIcon={
              <SvgIcon fontSize="small">
                <ArrowRightIcon />
              </SvgIcon>
            }
            size="small"
            variant="text"
          >
            View all
          </Button>
        </CardActions>
      </Card>
    </InfiniteScroll>
  );
};
