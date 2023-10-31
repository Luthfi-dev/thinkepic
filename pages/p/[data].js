// pages/[data].js
import { useRouter } from "next/router";

function DynamicPage() {
  const router = useRouter();
  const { data } = router.query;

  return (
    <div>
      <h1>Halaman Dinamis</h1>
      <p>Nilai dari URL: {data}</p>
    </div>
  );
}

export default DynamicPage;
