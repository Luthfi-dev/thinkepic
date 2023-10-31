import React, { useEffect, useState } from "react";
import { artikelUser, publicApi, getNamaApi } from "/utils/globals";
import { useRouter } from "next/router";
import axios from "axios";
import { artikelUserNotKey, linkApi, myAppLink } from "../../utils/globals";

const ArticlePage = () => {
  const [articles, setArticles] = useState(true);

  const router = useRouter();

  const { id } = router.query;

  useEffect(() => {
    if (id) {
      try {
        axios
          .get(`${artikelUser}&id=${id}`)
          .then((response) => {
            if (response.data.data[0].slug) {
              router.push(`${myAppLink}/view/${response.data.data[0].slug}`);
            } else {
              setArticles(false);
            }
          })
          .catch((error) => {
            console.error("Error fetching data: ", error);
            setArticles(false);
          });
      } catch (error) {
        console.error("An error occurred: ", error);
        setArticles(false);
      }
    }
  }, [id, router]);

  return (
    <>
      {articles ? (
        <center>Tunggu, Sedang Mengambil konten...</center>
      ) : (
        <center>Konten tidak Ditemukan / Link tidak valid</center>
      )}
    </>
  );
};

export default ArticlePage;
