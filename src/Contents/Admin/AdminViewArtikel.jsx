import Link from 'next/link';
import React, { useEffect, useState} from 'react';
import { Container, Row, Col, Image, Button, Modal, Form } from 'react-bootstrap';
import { artikelApi, artikelPageApi, komentarApi, notifikasiApi, publicApi } from '../../../utils/globals';
import { useRouter } from 'next/router';
import axios from 'axios';
import configureAxios from '../../../pages/axios-config';

const ArticlePage = () => {
 const [addCardClass, setAddCardClass] = useState(false);
 const [articles, setArticles] = useState([]);
 const [media, setMedia] = useState("");
 const [show, setShow] = useState(false);
const [inputValue, setInputValue] = useState('');
 const router = useRouter();

 console.log("media",media)

 const fifiAxios = configureAxios();

const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

   useEffect(() => {
    // Fungsi untuk menangani peristiwa scroll
    const handleScroll = () => {
      if (window.scrollY >= 50) {
        setAddCardClass(true);
      } else {
        setAddCardClass(false);
      }
    };

    // Tambahkan event listener untuk mendengarkan peristiwa scroll
    window.addEventListener("scroll", handleScroll);

    // Jangan lupa untuk menghapus event listener saat komponen unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

    const { id } = router.query; // Menggunakan destructuring untuk mendapatkan nilai id
    console.log(id);
    useEffect(() => {
        // Pastikan id tidak kosong sebelum melakukan permintaan Axios
        if (id) {
            fifiAxios.get(`${artikelPageApi}?id=${id}`)
                .then((response) => {
                    setArticles(response.data.data[0]);
                    // console.log(response.data.data[0]);
                    setMedia(`${publicApi}/${response.data.data[0].media}`)
                })
                .catch((error) => {
                    console.error('Error fetching data: ', error);
                });
        }
    }, [id]);

const UpdateArtikel = async (status) => {
  try {
    const response = await fifiAxios.put(`${artikelApi}/status/${id}`, { "status": status });
    
    if (response.status === 200) {
        console.log(`Artikel berhasil ${status}`);
        if (status === "ditolak") {
            try {
            const responseDitolak = await fifiAxios.post(`${komentarApi}`, {
                "isi": inputValue,
                "id_artikel": articles.id,
                "penulis": 1,
                "editor": 3
            },{headers : {"Content-Type": "application/json"}});
            // buat notif
            const responseNotifikasi = await fifiAxios.post(`${notifikasiApi}`, {
                "isi_notifikasi": `Postingan Kamu Ditolak ${inputValue ? 'Dengan Alasan ' : ''} <b>${inputValue}</b> Segera Perbaiki!`,
                "user_id": 1,
                "level": "admin"
            },{headers : {"Content-Type": "application/json"}});

            if (responseNotifikasi.status === 200) {
                handleClose();
                alert("Postingan Berhasil Ditolak");
                router.push('/super-admin/verifikasi');
            } else {
                console.error("Gagal mengupdate artikel ditolak.");
            }
            } catch (error) {
            console.error("Error saat mengupdate artikel ditolak:", error);
            }
        }

    } else {
      console.error(`Gagal mengupdate artikel: ${response.data.message}`);
    }
  } catch (error) {
    console.error('Error:', error);
    // Tangani kesalahan jika permintaan gagal, misalnya menampilkan pesan kesalahan
  }
};


  const handleInputChange = (e) => {
    // Mengupdate state saat nilai input berubah
    setInputValue(e.target.value);
    console.log(e.target.value);
  };

    return (
        <>
        <Container className='col-md-8'>
            <Row className="mt-1">
                <Col className='card pt-1 quill' style={{position:"relative"}}>
                   {media !== `${publicApi}/` ? (
                        <>
                            {media.endsWith(".jpg") || media.endsWith(".png") || media.endsWith(".jpeg") ? (
                             <>
                            <h1 style={{ fontFamily: 'Time New Roman, sans-serif' }}>{articles.judul}</h1>
                            <Image src={media} fluid alt={`image ${articles.judul}`} />
                            </>
                            ) : media.endsWith(".mp4") ? (
                            <>
                            <video controls>
                                <source src={media} type="video/mp4" />
                                Your browser does not support the video tag.
                            </video>
                            <h1 style={{ fontFamily: 'Time New Roman, sans-serif' }}>{articles.judul}</h1>
                            </>
                            ) : (
                            "Tipe media tidak didukung" // Tambahkan pesan kesalahan jika ekstensi tidak dikenali
                            )}
                        </>
                        ) : (
                        <h1 style={{ fontFamily: 'Time New Roman, sans-serif' }}>{articles.judul}</h1>
                        )}

                    <p className="mt-3">
                    <em>
                        {media.endsWith(".jpg") || media.endsWith(".png") || media.endsWith(".jpeg") ? (
                        `Penulis: Nama Penulis | Editor: Nama Editor`
                        ) : media.endsWith(".mp4") ? (
                        `Creator: Nama Creator | Editor: Nama Editor`
                        ) : (
                        `Penulis: Nama Penulis | Editor: Nama Editor`
                        )
                        }
                    </em>
                    </p>

                   <div className="mt-3" style={{ overflow: 'hidden', maxWidth:"100%" }}>
                    <p dangerouslySetInnerHTML={{ __html: articles.isi }} />
                    </div>

                    <div className="mt-4">
                        <Button variant="success" className="mr-2">
                            <Link href="whatsapp://send?text=Judul%20Artikel:%20URL_Artikel" target="_blank" className="text-white">
                                <i className="fab fa-whatsapp"></i> WhatsApp
                            </Link>
                        </Button>
                        <Button variant="primary" className="mr-2">
                            <Link href="https://www.facebook.com/sharer/sharer.php?u=URL_Artikel" target="_blank" className="text-white">
                                <i className="fab fa-facebook"></i> Facebook
                            </Link>
                        </Button>
                        <Button variant="info" className="mr-2">
                            <Link href="https://telegram.me/share/url?url=URL_Artikel&text=Judul%20Artikel" target="_blank" className="text-white">
                                <i className="fab fa-telegram"></i> Telegram
                            </Link>
                        </Button>
                        <Button variant="secondary">
                            <Link href="#" onClick={() => { navigator.clipboard.writeText("URL_Artikel"); }}>
                                <i className="fas fa-copy"></i> Copy Link
                            </Link>
                        </Button>
                    </div>
                </Col>
            </Row>
        </Container>
        </>
    );
};

export default ArticlePage;
