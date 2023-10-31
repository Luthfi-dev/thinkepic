import React, { useEffect, useState } from "react";
import IconButton from "@mui/material/IconButton";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Container, Row, Col, Image, Button } from "react-bootstrap";
import { artikelUser, publicApi, getNamaApi } from "/utils/globals";
import { useRouter } from "next/router";
import axios from "axios";
import { Helmet } from "react-helmet";
import { UserLayout } from "../../src/components/User/UserLayout";
import CardPopuler from "@/components/RootApp/CardPopuler";
import { artikelUserNotKey, linkApi, myAppLink } from "../../utils/globals";
import { showDynamicAlert } from "@/Contents/showDynamicAlert";

const ArticlePage = () => {
  const [addCardClass, setAddCardClass] = useState(false);
  const [articles, setArticles] = useState([]);
  const [media, setMedia] = useState("");
  const [namaPenulis, setNamaPenulis] = useState(null);
  const [namaEditor, setNamaEditor] = useState(null);
  const [copyLinkOpen, setCopyLinkOpen] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY >= 50) {
        setAddCardClass(true);
      } else {
        setAddCardClass(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const { slug } = router.query;

  useEffect(() => {
    if (slug) {
      try {
        axios
          .get(`${artikelUser}&slug=${slug}`)
          .then((response) => {
            setArticles(response.data.data[0]);
            setMedia(`${publicApi}/${response.data.data[0].media}`);
          })
          .catch((error) => {
            console.error("Error fetching data: ", error);
          });
      } catch (error) {
        console.error("An error occurred: ", error);
      }
    }
  }, [slug]);

  useEffect(() => {
    const fetchNamaPenulis = async () => {
      try {
        const response = await axios.get(
          `${getNamaApi}?id=${articles.user_id}`
        );
        const nama = response.data[0].nama;
        setNamaPenulis(nama);
      } catch (error) {
        console.error("Terjadi kesalahan saat mengambil data dari API:", error);
      }
    };

    if (articles) {
      fetchNamaPenulis();
    }
  }, [articles]);

  useEffect(() => {
    const fetchNamaEditor = async () => {
      try {
        const response = await axios.get(
          `${getNamaApi}?id=${articles.user_id}`
        );
        const nama = response.data[0].nama;
        setNamaEditor(nama);
      } catch (error) {
        console.error("Terjadi kesalahan saat mengambil data dari API:", error);
      }
    };

    if (articles) {
      fetchNamaEditor();
    }
  }, [articles]);

  const handleCopyLinkClick = () => {
    setCopyLinkOpen(true);
  };

  const handleCopyClick = async (link) => {
    try {
      await navigator.clipboard.writeText(link);
      setCopyLinkOpen(false);
      showDynamicAlert("Link Berhasil Disalin", "successTime");
    } catch (error) {
      console.error("Error copying to clipboard:", error);
    }
  };

  function handleShareClick() {
    if (navigator.share) {
      let shareData = {
        title: articles.judul,
        url: `${myAppLink}/view/${articles.slug}`,
      };

      if (articles.media !== "") {
        shareData.image = [{ src: `${linkApi}/${articles.media}` }];
      }

      navigator
        .share(shareData)
        .then(() => console.log("Artikel dibagikan"))
        .catch((error) => console.error("Error berbagi artikel:", error));
    }
  }

  useEffect(() => {
    if (articles.id) {
      try {
        axios
          .put(
            `${artikelUserNotKey}/${articles.id}`,
            {
              view: 1,
            },
            {
              headers: {
                "content-type": "application/json",
              },
            }
          )
          .then((response) => {
            console.log("Response:", response);
          })
          .catch((error) => {
            console.error("Error updating view:", error);
          });
      } catch (error) {
        console.error("An error occurred: ", error);
      }
    }
  }, [articles.id]);

  return (
    <>
      <UserLayout>
        <Helmet>
          <title>{articles.judul}</title>
          <meta name="description" content={articles.judul} />
          <meta name="keywords" content={articles.tags} />
        </Helmet>
        <Container className="col-md-8">
          <Row className="col-md-12 mt-1">
            <Col className="col-12 col-md-8 pt-1 mb-5">
              {/* {media !== `${publicApi}/` ? (
                <>
                  {media.endsWith(".jpg") ||
                  media.endsWith(".png") ||
                  media.endsWith(".jpeg") ? (
                    <>
                      <h1 style={{ fontFamily: "Time New Roman, sans-serif" }}>
                        {articles.judul}
                      </h1>
                      <Image src={media} fluid alt="image artikel" />
                    </>
                  ) : media.endsWith(".mp4") ? (
                    <>
                      <video controls className="col-md-12 col-12">
                        <source src={media} type="video/mp4" />
                        Your browser does not support the video tag.
                      </video>
                      <h1 style={{ fontFamily: "Time New Roman, sans-serif" }}>
                        {articles.judul}
                      </h1>
                    </>
                  ) : (
                    "Tipe media tidak didukung"
                  )}
                </>
              ) : (
                <h1 style={{ fontFamily: "Time New Roman, sans-serif" }}>
                  {articles.judul}
                </h1>
              )} */}

              <h2
                style={{
                  fontFamily: "Time New Roman, sans-serif",
                  marginTop: "5px",
                }}
              >
                {articles.judul}
              </h2>

              <p className="mt-3" style={{ fontSize: "11px" }}>
                <em>
                  Creator: {namaPenulis} | Editor: {namaEditor || "-"}
                </em>
              </p>

              <p
                className="mt-3"
                dangerouslySetInnerHTML={{ __html: articles.isi }}
              />
              <div className="mt-4">
                <button
                  className="btn btn-app bordered"
                  onClick={handleShareClick}
                >
                  <span className="bi bi-share"></span> Bagikan
                </button>
                <button
                  className="btn btn-app bordered"
                  style={{ marginLeft: "5px" }}
                  onClick={handleCopyLinkClick}
                >
                  <span className="bi bi-clipboard"></span> Salin Link
                </button>
                <Dialog
                  open={copyLinkOpen}
                  onClose={() => setCopyLinkOpen(false)}
                  style={{ zIndex: "1" }}
                >
                  <DialogTitle style={{ color: "white" }} className="bg-app2">
                    copied to clipboard
                  </DialogTitle>
                  <DialogContent>
                    <div style={{ marginBottom: "16px" }}>
                      <h5>Link:</h5>
                      <div className="input-group">
                        <input
                          className="form-control"
                          value={`${myAppLink}/view/${articles.slug}`}
                          placeholder={`${myAppLink}/view/${articles.slug}`}
                          readOnly
                        />
                        <IconButton
                          onClick={() =>
                            handleCopyClick(
                              `${myAppLink}/view/${articles.slug}`
                            )
                          }
                        >
                          <FileCopyIcon />
                        </IconButton>
                      </div>
                    </div>
                    <div>
                      <h5>Short Link:</h5>
                      <div className="input-group">
                        <input
                          className="form-control"
                          value={`${myAppLink}/s/${articles.id}`}
                          placeholder={`${myAppLink}/s/${articles.id}`}
                          readOnly
                        />
                        <IconButton
                          onClick={() =>
                            handleCopyClick(`${myAppLink}/s/${articles.id}`)
                          }
                        >
                          <FileCopyIcon />
                        </IconButton>
                      </div>
                    </div>
                  </DialogContent>
                  <DialogActions
                    style={{
                      borderTop: "1px solid #ccc",
                    }}
                    className="bg-app2"
                  >
                    <Button
                      className="btn-dark"
                      onClick={() => setCopyLinkOpen(false)}
                      style={{ color: "white" }}
                    >
                      Tutup
                    </Button>
                  </DialogActions>
                </Dialog>
              </div>
            </Col>
            <Col className="col-12 col-md-4 pt-1">
              <CardPopuler />
            </Col>
          </Row>
        </Container>
      </UserLayout>
    </>
  );
};

export default ArticlePage;
