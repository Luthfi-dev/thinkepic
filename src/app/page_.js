// import Image from "next/image";
import HomeIndex from "./index";
import { UserLayout } from "@/components/User/UserLayout";

export default function Page() {
  return (
    <UserLayout>
      <HomeIndex />
    </UserLayout>
  );
}
