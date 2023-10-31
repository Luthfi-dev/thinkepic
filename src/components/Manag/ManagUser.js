import React, { useEffect, useState } from "react";
import axios from "axios";
import { managUser } from "../../../utils/globals";
import { showDynamicAlert } from "@/Contents/showDynamicAlert";
import { useRouter } from "next/router";

const ManagUser = () => {
  const [totalUser, setTotalUser] = useState(0);
  const [dataAll, setDataAll] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const router = useRouter();
  const refreshPage = () => {
    router.replace(router.asPath);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Ambil data total user
        const countResponse = await axios.get(`${managUser}`);
        const countData = countResponse.data;
        const totalCount = countData.total;
        setTotalUser(totalCount);

        // Ambil data pengguna berdasarkan halaman saat ini
        const response = await axios.get(
          `${managUser}?page=${currentPage}&jumlah=5`
        );

        const dataAmbil = response.data;

        setDataAll(dataAmbil.data);
      } catch (error) {
        console.error("Terjadi kesalahan:", error);
      }
    };

    fetchData();
    console.log(dataAll);
  }, [currentPage]); // Tambahkan currentPage ke dalam dependensi useEffect

  //update status
  const handleStatusChange = async (e, userId) => {
    const newStatus = e.target.value; // Ambil nilai dari elemen select

    try {
      // Kirim permintaan ke server untuk memperbarui status pengguna
      const response = await axios.put(`${managUser}/${userId}`, {
        status: newStatus,
      });

      if (response.status === 200) {
        showDynamicAlert("Status User berhasil di Update", "successTime");
        refreshPage();
        // Jika berhasil, perbarui status pengguna di state atau dataAll
        console.log("sukses");
        setDataAll((prevData) => {
          return prevData.map((user) => {
            if (user.id === userId) {
              return { ...user, status: newStatus };
            }
            return user;
          });
        });
      }
    } catch (error) {
      console.error("Terjadi kesalahan:", error);
    }
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber); // Mengubah halaman saat tombol halaman diklik
  };

  const renderPagination = () => {
    const totalPages = Math.ceil(totalUser / 5);

    if (totalPages <= 1) {
      return null;
    }

    const pageButtons = [];
    for (let i = 1; i <= totalPages; i++) {
      pageButtons.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={`page-link rounded-circle end-0 ${
            currentPage === i ? "active" : ""
          }`}
        >
          {i}
        </button>
      );
    }

    return (
      <nav aria-label="Page navigation example">
        <ul className="pagination justify-content-center">{pageButtons}</ul>
      </nav>
    );
  };

  return (
    <div>
      <h1>Data Pengguna</h1>
      <table className="table table-light">
        <thead>
          <tr>
            {/* <th scope="col">#</th> */}
            <th scope="col">email</th>
            <th scope="col">nama</th>
            <th scope="col">status akun</th>
            <th scope="col">role</th>
            <th scope="col">status login</th>
          </tr>
        </thead>
        <tbody>
          {dataAll.map((user, index) => (
            <tr key={index}>
              {/* <th scope="row">{index + 1}</th> */}
              <td>{user.email}</td>
              <td>{user.nama}</td>
              <td>
                <select
                  name="status"
                  onChange={(e) => handleStatusChange(e, user.id_user)}
                  className={
                    user.status === "active"
                      ? "btn btn-primary btn-sm"
                      : "btn btn-danger btn-sm"
                  }
                >
                  <option
                    value="active"
                    selected={user.status === "active" || user.status === null}
                  >
                    Active
                  </option>
                  <option
                    value="deactive"
                    selected={
                      user.status === "deactive" || user.status === null
                    }
                    // style={{ backgroundColor: "red" }}
                  >
                    Deactive
                  </option>
                </select>
              </td>

              <td>{user.role}</td>
              <td>{user.refresh_token === "" ? "NO" : "YES"}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {renderPagination()}
    </div>
  );
};

export default ManagUser;
