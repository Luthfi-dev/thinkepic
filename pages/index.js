// import Image from "next/image";
import HomeIndex from "@/app";
import { UserLayout } from "@/components/User/UserLayout";

export default function Page() {
  return (
    <UserLayout>
      <HomeIndex />
    </UserLayout>
  );
}
