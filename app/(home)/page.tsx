import { redirect } from "next/navigation";
import { testInstanceList } from "../constants/testInstanceList";
import API from "../utils/api";
import MainPage from "./components/mainPage";
import { cookies } from "next/headers";

export default async function Home() {
  const cookie = cookies();
  const admintestAuthorization = cookie.get("admintestAuthorization");
  if (admintestAuthorization) {
    const admintestAuthorizationValue = admintestAuthorization.value;
    const instanceList =
      process.env.NEXT_PUBLIC_TEST === "test"
        ? testInstanceList
        : (await API.getInstances(admintestAuthorizationValue)).data;

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
  } else {
    redirect("/login");
  }
}
