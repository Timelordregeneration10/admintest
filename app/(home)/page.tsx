import { testInstanceList } from "../constants/testInstanceList";
import { EC2Instance } from "../interfaces/instance";
import API from "../utils/api";
import MainPage from "./components/mainPage";
import { cookies } from "next/headers";

export default async function Home() {
  const cookie = cookies();
  const admintestAuthorization = cookie.get("admintestAuthorization");
  const getInstance = async (): Promise<Array<EC2Instance>> => {
    if (process.env.NEXT_PUBLIC_TEST === "test") {
      return testInstanceList;
    } else {
      if (admintestAuthorization) {
        const res = await API.getInstances(admintestAuthorization.value);
        return res.data;
      } else {
        return [];
      }
    }
  };

  const instanceList = await getInstance();

  return (
    <div className="w-full h-screen p-4 flex justify-center items-center ">
      <div className="w-[90%] h-[90vh] no-scrollbar overflow-scroll flex flex-col items-center gap-8">
        <MainPage
          InstanceList={instanceList}
          admintestAuthorization={admintestAuthorization}
        />
      </div>
    </div>
  );
}
