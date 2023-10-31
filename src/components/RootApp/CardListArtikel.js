import * as React from "react";
import Grid from "@mui/material/Grid";
import CardMedia from "@mui/material/CardMedia";
import IconButton from "@mui/material/IconButton";
import Avatar from "@mui/material/Avatar";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import Image from "next/image";
import {
  artikelUser,
  getNamaApi,
  publicApi,
  linkApi,
  myAppLink,
} from "../../../utils/globals";
import InfiniteScroll from "react-infinite-scroll-component";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import Skeleton from "@mui/material/Skeleton";

import {
  Box,
  Button,
  Card,
  CardActions,
  CardHeader,
  CardContent,
  Collapse,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";

export const CardListArtikel = () => {
  const [artikels, setArtikels] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  //   const [viewAllData, setViewAllData] = useState("&jumlah=1");
  const [expandedMap, setExpandedMap] = React.useState({}); // Gunakan objek untuk melacak status ekspansi setiap kartu
  const [isLoading, setIsLoading] = useState(true);
  const [penulisMap, setPenulisMap] = useState({});

  useEffect(() => {
    fetchData();
  }, [page]);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${artikelUser}&page=${page}&status=diterima`
      );
      const data = response.data.data;
      if (data.length === 0) {
        setHasMore(false);
      }
      if (page === 1) {
        setArtikels(data);
      } else {
        setArtikels([...artikels, ...data]);
      }

      // Periksa apakah isLoading diatur dengan benar
      //   console.log("isLoading:", isLoading);

      if (response) {
        setIsLoading(false);
      }
    } catch (error) {
      console.error("Terjadi kesalahan saat mengambil data dari API:", error);
    }
  };

  useEffect(() => {
    // Fungsi untuk mengambil nama penulis berdasarkan id_user
    const getNamaPenulis = async (id_user) => {
      //   console.log("Mengambil nama penulis untuk id_user:", id_user);
      try {
        const response = await axios.get(`${getNamaApi}?id=${id_user}`);
        const nama = response.data[0].nama;
        // console.log("Nama penulis yang diambil:", nama);
        return nama;
      } catch (error) {
        console.error("Terjadi kesalahan saat mengambil data dari API:", error);
      }
    };

    // Mengambil nama penulis untuk setiap artikel
    const fetchNamaPenulis = async () => {
      const namaPenulisMap = {};

      for (const artikel of artikels) {
        const namaPenulis = await getNamaPenulis(artikel.user_id);
        namaPenulisMap[artikel.user_id] = namaPenulis;
      }

      setPenulisMap(namaPenulisMap);
    };

    fetchNamaPenulis();
  }, [artikels]);

  const nextView = () => {
    // console.log(hasMore);
    if (hasMore) {
      setPage(page + 1);
      fetchData();
    }
  };

  const filterHTMLTags = (text) => {
    return text.replace(/<\/?[^>]+(>|$)/g, "");
  };

  const potongDiSpasi = (text, maxLength) => {
    if (text.length < 15) {
      return (
        <div dangerouslySetInnerHTML={{ __html: `${text} <br /> <br />` }} />
      );
    }

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

  const calculateTimeAgo = (updated_at) => {
    const createdTime = new Date(updated_at);
    const currentTime = new Date();
    const diffInMilliseconds = currentTime - createdTime;
    const diffInMinutes = Math.floor(diffInMilliseconds / (1000 * 60));
    const diffInHours = Math.floor(diffInMinutes / 60);
    const diffInDays = Math.floor(diffInHours / 24);

    if (diffInDays === 0) {
      if (diffInHours === 0) {
        return `${diffInMinutes} minute ago`;
      } else {
        return `${diffInHours} hour ago`;
      }
    } else if (diffInDays === 1) {
      return "1 day ago";
    } else {
      return `${diffInDays} days ago`;
    }
  };

  function handleExpandClick(index) {
    // Toggle status ekspansi untuk kartu yang diklik
    setExpandedMap((prevExpandedMap) => ({
      ...prevExpandedMap,
      [index]: !prevExpandedMap[index],
    }));
  }

  function inisialUser(name) {
    // Membuang spasi di awal dan akhir nama
    name = name.trim();

    // Memisahkan nama menjadi kata-kata
    const words = name.split(" ");

    // Menginisialisasi variabel untuk inisial
    let initials = "";

    // Loop melalui setiap kata dalam nama
    for (const word of words) {
      // Mengambil karakter pertama dari setiap kata dan mengonversinya ke huruf besar
      const initial = word[0].toUpperCase();
      initials += initial;
    }

    return initials;
  }

  // Fungsi untuk menangani klik tombol share
  function handleShareClick(judul, slug) {
    if (navigator.share) {
      let shareData = {
        title: judul,
        url: `${myAppLink}/view/${slug}`,
      };

      navigator
        .share(shareData)
        .then(() => console.log("Artikel dibagikan"))
        .catch((error) => console.error("Error berbagi artikel:", error));
    }
  }

  return (
    <InfiniteScroll
      dataLength={artikels.length}
      //   next={fetchData}
      next={() => {
        nextView();
      }}
      hasMore={hasMore}
    >
      <center>
        <CardHeader
          title="Postingan Terbaru"
          sx={{
            height: "50px",
            width: "100%",
            // background: "url(/assets/svg/component/label-header.svg)",
            backgroundRepeat: "no-repeat",
            marginLeft: "-5px",
            marginBottom: "15px",
            fontWeight: "bold",
          }}
        />
      </center>
      {isLoading ? (
        <Skeleton variant="text" width="100%" height={400} animation="wave" />
      ) : (
        <>
          <Grid container spacing={2}>
            {artikels.map((artikel, index) => (
              <Grid item xs={window.innerWidth > 600 ? 3 : 12} key={index}>
                <Card>
                  <CardHeader
                    avatar={
                      <Avatar className="bg-app" aria-label="recipe">
                        {inisialUser(penulisMap[artikel.user_id] || "U")}
                      </Avatar>
                    }
                    action={
                      <IconButton
                        aria-label="settings"
                        onClick={() => handleExpandClick(index)}
                      >
                        <MoreVertIcon />
                      </IconButton>
                    }
                    title={penulisMap[artikel.user_id] || ""}
                    subheader={`${calculateTimeAgo(artikel.updated_at)}`}
                  />
                  <Link
                    className="text-decoration-none"
                    href={`/view/${artikel.slug}`}
                  >
                    <CardMedia>
                      <Image
                        src={
                          artikel.media
                            ? `${publicApi}/${artikel.media}`
                            : "/assets/img/logo_epic2.png"
                        }
                        alt="Gambar Artikel"
                        width={300}
                        height={200}
                        style={{ objectFit: "cover", width: "100%" }}
                      />
                    </CardMedia>

                    <CardContent className="mt-2">
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={
                          window.innerWidth <= 600
                            ? {
                                fontSize: "11pt",
                                fontWeight: "bold",
                                lineHeight: "1",
                                color: "rgba(0,0,0,0.5)",
                              }
                            : {
                                fontSize: "14pt",
                                fontWeight: "bold",
                                lineHeight: "1",
                                color: "rgba(0,0,0,0.5)",
                              }
                        }
                        gutterBottom
                      >
                        {potongDiSpasi(filterHTMLTags(artikel.judul), 45)}
                      </Typography>
                    </CardContent>
                  </Link>
                  <CardActions disableSpacing>
                    {/* <IconButton aria-label="add to favorites">
                      <FavoriteIcon />
                    </IconButton> */}
                    <IconButton
                      aria-label="share"
                      onClick={() =>
                        handleShareClick(artikel.judul, artikel.slug)
                      }
                    >
                      <ShareIcon className="color-app2" />
                    </IconButton>

                    <IconButton
                      className="color-app"
                      aria-label="show more"
                      onClick={() => handleExpandClick(index)}
                      aria-expanded={expandedMap[index]}
                    >
                      <ExpandMoreIcon />
                    </IconButton>
                  </CardActions>
                  <Collapse
                    in={expandedMap[index]}
                    timeout="auto"
                    unmountOnExit
                  >
                    <CardContent>
                      <Typography paragraph>
                        Deskripsi :{" "}
                        {potongDiSpasi(
                          filterHTMLTags(artikel.isi),
                          window.innerWidth > 600 ? 150 : 100
                        )}
                      </Typography>
                      {/* ... Other content ... */}
                    </CardContent>
                  </Collapse>
                </Card>
              </Grid>
            ))}
          </Grid>
        </>
      )}

      {/* <div className="mb-3">
        {hasMore ? (
          <Button
            className="btn btn-outline-dark btn-sm"
            color="inherit"
            onClick={() => {
              nextView();
            }}
            //   endIcon={<ArrowRightIcon />}
            size="small"
            variant="text"
            style={{ margin: "20px" }}
          >
            Next View
            <PlayArrowIcon />
          </Button>
        ) : (
          ""
        )}
      </div> */}
    </InfiniteScroll>
  );
};
