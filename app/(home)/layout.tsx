import { redirect } from "next/navigation";
import serverGetUserInfo from "../utils/serverGetUserInfo";
import NavBar from "./components/NavBar";
import BG from "./components/BG";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  if (process.env.NEXT_PUBLIC_TEST === "test") {
  } else {
    const userInfo = await serverGetUserInfo();
    if (!userInfo) {
      redirect("/login");
    }
  }
  return (
    <section>
      <NavBar>{children}</NavBar>
      <BG></BG>
    </section>
  );
}
