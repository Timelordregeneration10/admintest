"use client";
import { logoutClicked } from "@/app/utils/login";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { MdExitToApp } from "react-icons/md";

export default function NavBar({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [closed, setClosed] = useState(false);
  const router = useRouter();

  return (
    <>
      <div
        className="fixed h-screen w-40 left-0 top-0 z-50 flex flex-col justify-between py-3 overflow-hidden transition-all bg-[#33333344] text-white"
        style={{
          width: closed ? "0" : "160px",
          paddingLeft: closed ? "0" : "12px",
          paddingRight: closed ? "0" : "12px",
        }}
      >
        {/* top part */}
        <div className="min-w-[136px] flex flex-col gap-2">
          <div
            className="w-full flex gap-2 text-lg items-center cursor-pointer py-2"
            onClick={() => router.push("/")}
          >
            {/* <span className="font-bold animate-brand"> */}
            <span className="font-bold [text-shadow:2px_2px_2px_#000000]">
              EC2 Instance Manager
            </span>
          </div>
        </div>
        {/* bottom part */}
        <div className="min-w-[136px] flex flex-col gap-2">
          <div
            className="w-full flex gap-2 text-md items-center cursor-pointer p-2 bg-[#33333322] hover:bg-[#33333377] transition-background rounded-lg"
            onClick={logoutClicked}
          >
            <MdExitToApp />
            <span>Logout</span>
          </div>
        </div>
      </div>

      {/* open or close button */}
      <div
        className=" bg-[#19191966] fixed top-2/3 w-12 h-12 left-[136px] z-50 rounded-full transition-transform [clip-path:_polygon(50%_0,_100%_0%,_100%_100%,_50%_100%);] flex justify-end items-center pr-[6px] text-white cursor-pointer"
        style={{ transform: closed ? "translateX(-160px)" : "translateX(0)" }}
        onClick={(e) => setClosed(!closed)}
      >
        {closed ? <FaChevronRight /> : <FaChevronLeft />}
      </div>

      <div
        className="relative z-[1] w-screen h-screen transition-[clip-path] flex select-none"
        // style={{
        //   clipPath: closed
        //     ? "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)"
        //     : "polygon(250px 0%, 100% 0%, 100% 100%, 250px 100%)",
        // }}
      >
        <div
          className="w-[160px] h-full transition-width"
          style={{ width: closed ? "0px" : "160px" }}
        ></div>

        {children}
      </div>
    </>
  );
}
