import { testInstanceList } from "../constants/testInstanceList";
import API from "../utils/api";
import serverGetAuth from "../utils/serverGetAuth";
import MainPage from "./components/mainPage";

export const dynamic = "force-dynamic";

export default async function Home() {
  const admintestAuthorization = await serverGetAuth();
  const instanceList =
    process.env.NEXT_PUBLIC_TEST === "test"
      ? testInstanceList
      : (await API.getInstances(admintestAuthorization)).data;

  return (
    <div className="w-full h-screen p-4 flex justify-center items-center ">
      <div className="w-[90%] h-[90vh] no-scrollbar overflow-scroll flex flex-col items-center gap-8">
        <MainPage
          //@ts-ignore
          InstanceList={instanceList}
          admintestAuthorization={admintestAuthorization}
        />
      </div>
    </div>
  );
}
