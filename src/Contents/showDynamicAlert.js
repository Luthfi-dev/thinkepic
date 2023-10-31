import Swal from "sweetalert2";

export const showDynamicAlert = (pesan, tipe = "info") => {
  let icon = "info";

  // Mengatur ikon berdasarkan tipe pesan yang diterima
  switch (tipe) {
    case "success":
      icon = "success";
      break;
    case "successTime":
      icon = "success";
      break;
    case "error":
      icon = "error";
      break;
    case "errorTime":
      icon = "error";
      break;
    case "warning":
      icon = "warning";
      break;
    case "info":
      icon = "info";
      break;
    case "question":
      icon = "question";
      break;
    default:
      icon = "info"; // Default ke ikon informasi jika tipe tidak dikenali
  }

  // Jika tipe pesan adalah "success" (berhasil login), maka tambahkan timer
  if (tipe === "successTime") {
    Swal.fire({
      icon,
      text: pesan,
      timer: 2000, // Menutup notifikasi otomatis setelah 2 detik
      showConfirmButton: false, // Menyembunyikan tombol OK
    });
  } else if (tipe === "errorTime") {
    Swal.fire({
      icon,
      text: pesan,
      timer: 2000, // Menutup notifikasi otomatis setelah 2 detik
      showConfirmButton: false, // Menyembunyikan tombol OK
    });
  } else if (tipe === "loading") {
    Swal.fire({
      imageUrl: "/assets/svg/loading2.gif",
      // timer: 2000, // Menutup notifikasi otomatis setelah 2 detik
      showConfirmButton: false, // Menyembunyikan tombol OK
    });
  } else {
    // Jika tipe pesan bukan "success", tampilkan notifikasi tanpa timer
    Swal.fire({
      icon,
      title: "Notifikasi",
      text: pesan,
      confirmButtonText: "OK",
      customClass: {
        confirmButton: "btn btn-warning",
      },
    });
  }
};
