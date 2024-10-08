import serverGetAuth from "../utils/serverGetAuth";
import MainPage from "./components/mainPage";

export default async function Home() {
  let admintestAuthorization = "";
  if (process.env.NEXT_PUBLIC_TEST !== "test") {
    admintestAuthorization = await serverGetAuth();
  }
  return (
    <div className="w-full h-screen p-4 flex justify-center items-center ">
      <div className="w-[90%] h-[90vh] no-scrollbar overflow-scroll flex flex-col items-center gap-8">
        <MainPage admintestAuthorization={admintestAuthorization} />
      </div>
    </div>
  );
}
