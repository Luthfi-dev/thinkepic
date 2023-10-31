import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import InfiniteScroll from "react-infinite-scroll-component";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardHeader,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import Skeleton from "@mui/material/Skeleton";
import { artikelUser, publicApi } from "../../../utils/globals";

const CardArtikel = ({ pKategori, categories }) => {
  const [artikels, setArtikels] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [pKago, setPKategori] = useState("all");

  useEffect(() => {
    fetchData();
  }, [page]);

  // console.log("kategori", pKategori);

  useEffect(() => {
    setArtikels([]);
    setPage(1);
    fetchData();
    // console.log("hs", artikels, page);
  }, [pKategori]);

  const fetchData = async () => {
    const kgo =
      categories[pKategori] !== "all"
        ? `&kategori=${categories[pKategori]}`
        : "&kategori";
    try {
      const response = await axios.get(
        `${artikelUser}&page=${page}${kgo}&status=diterima&type=foto`
      );
      const data = response.data.data;
      if (data.length > 0) {
        setHasMore(true);
      }
      if (data.length === 0) {
        setHasMore(false);
      }
      if (page === 1) {
        setArtikels(data);
      } else {
        setArtikels([...artikels, ...data]);
      }

      // Anda harus memeriksa isLoading di sini, bukan di dalam respons
      // console.log("isLoading:", isLoading);

      // Hanya atur isLoading ke false jika response berhasil
      setIsLoading(false);
    } catch (error) {
      console.error("Terjadi kesalahan saat mengambil data dari API:", error);
      // Anda juga perlu mengatur isLoading ke false di sini dalam kasus error
      setIsLoading(false);
    }
  };

  const nextView = () => {
    if (hasMore) {
      setPage(page + 1);
    }
  };

  const filterHTMLTags = (text) => {
    return text.replace(/<\/?[^>]+(>|$)/g, "");
  };

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

  return (
    <InfiniteScroll dataLength={artikels.length} hasMore={hasMore}>
      <Card>
        {isLoading ? (
          <Skeleton variant="text" width="100%" height={400} animation="wave" />
        ) : (
          <>
            <CardHeader
              title="New Artikels"
              sx={{
                height: "50px",
                width: "100%",
                background: "url(/assets/svg/component/label-header.svg)",
                backgroundRepeat: "no-repeat",
                color: "white",
                marginLeft: "-5px",
              }}
            />
            <List className="p-2">
              {artikels.length < 1 ? (
                <p>Belum ada artikel dengan kategori tersebut</p>
              ) : null}
              {artikels.map((artikel, index) => {
                const hasDivider = index < artikels.length - 1;
                let imageSrc = `${publicApi}/default/no_picture.png`;

                const fotoEkstensi = artikel.media
                  ? artikel.media.split(".").pop().toLowerCase()
                  : "";

                if (["jpg", "jpeg", "png", "gif"].includes(fotoEkstensi)) {
                  imageSrc = `${publicApi}/${artikel.media}`;
                } else if (artikel.jenis === "video") {
                  imageSrc = `${publicApi}/default/thum_video.png`;
                }

                return (
                  <>
                    <Link
                      className="text-decoration-none"
                      href={`/view/${artikel.slug}`}
                    >
                      <ListItem
                        divider={hasDivider}
                        key={`${artikel.id}-${index}`}
                      >
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
                            <Typography
                              className="color-app2"
                              sx={
                                window.innerWidth <= 600
                                  ? {
                                      fontSize: "12pt",
                                      fontWeight: "bold",
                                      lineHeight: "1",
                                    }
                                  : {
                                      fontSize: "16pt",
                                      fontWeight: "bold",
                                      lineHeight: "1",
                                    }
                              }
                              gutterBottom
                            >
                              {potongDiSpasi(filterHTMLTags(artikel.judul), 50)}
                            </Typography>
                          }
                          secondary={
                            <>
                              {potongDiSpasi(
                                filterHTMLTags(artikel.isi),
                                window.innerWidth > 600 ? 150 : 65
                              )}
                              <br />
                              <span
                                style={{ fontSize: "8pt" }}
                                // className="d-md-none"
                              >
                                {calculateTimeAgo(artikel.updated_at)}
                              </span>
                            </>
                          }
                          secondaryTypographyProps={{ variant: "body2" }}
                        />
                        <Typography
                          variant="body2"
                          sx={{
                            display: window.innerWidth > 600 ? "block" : "none",
                            textAlign: "right",
                          }}
                        >
                          {/* {calculateTimeAgo(artikel.updated_at)} */}
                        </Typography>
                      </ListItem>
                    </Link>
                  </>
                );
              })}
            </List>
            <Divider />
            <CardActions sx={{ justifyContent: "flex-end" }}>
              {hasMore ? (
                <Button
                  color="inherit"
                  endIcon={<ArrowRightIcon />}
                  size="small"
                  variant="text"
                  onClick={nextView}
                >
                  Next Page
                </Button>
              ) : (
                ""
              )}
            </CardActions>
          </>
        )}
      </Card>
    </InfiniteScroll>
  );
};

export default CardArtikel;
