"use client";
import { EC2Instance } from "@/app/interfaces/instance";
import API from "@/app/utils/api";
import { success } from "@/app/utils/message";
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  useDisclosure,
} from "@nextui-org/react";
import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";
import { useState } from "react";
import { FaCircleStop } from "react-icons/fa6";
import { MdRestartAlt } from "react-icons/md";
import { VscDebugStart } from "react-icons/vsc";
import ConfirmModal from "./confirmModal";

export default function MainPage({
  InstanceList,
  admintestAuthorization,
}: {
  InstanceList: Array<EC2Instance>;
  admintestAuthorization: RequestCookie | undefined;
}) {
  const [instanceList, setInstanceList] =
    useState<Array<EC2Instance>>(InstanceList);
  const [title, setTitle] = useState("");
  const [currentInstanceId, setCurrentInstanceId] = useState("");
  const [currentOperation, setCurrentOperation] = useState("");

  const handlePutInstance = async () => {
    if (process.env.NEXT_PUBLIC_TEST === "test") {
      success(currentOperation + " " + currentInstanceId + " successfully !");
    } else {
      if (admintestAuthorization)
        API.putInstance(
          currentInstanceId,
          currentOperation,
          admintestAuthorization.value
        )
          .then((res) => {
            if (res.status === 200) {
              success(
                currentOperation + " " + currentInstanceId + " successfully !"
              );
            }
          })
          .finally(() => {
            API.getInstances(admintestAuthorization.value).then((res) => {
              // @ts-ignore
              if (res.status === 200 && res.data) setInstanceList(res.data);
            });
          });
    }
  };
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  return (
    <>
      <Table
        aria-label="Example static collection table"
        className=" max-h-full overflow-scroll no-scrollbar"
        classNames={{
          wrapper: " max-h-full overflow-scroll no-scrollbar bg-[#ffffff66]",
        }}
        isHeaderSticky={true}
      >
        <TableHeader>
          <TableColumn className="bg-[#ffffffcc]">instanceName</TableColumn>
          <TableColumn className="bg-[#ffffffcc]">instanceId</TableColumn>
          <TableColumn className="bg-[#ffffffcc]">imageId</TableColumn>
          <TableColumn className="bg-[#ffffffcc]">instanceType</TableColumn>
          <TableColumn className="bg-[#ffffffcc]">
            instanceStateName
          </TableColumn>
          <TableColumn className="bg-[#ffffffcc]">monitoringState</TableColumn>
          <TableColumn className="bg-[#ffffffcc]">operation</TableColumn>
        </TableHeader>
        <TableBody>
          {instanceList.map((instance, index) => {
            return (
              <TableRow key={index}>
                <TableCell className="p-0">
                  <div className="p-1 rounded-lg flex items-center justify-start">
                    {instance.instanceName}
                  </div>
                </TableCell>
                <TableCell className="p-0">
                  <div className="p-1 rounded-lg flex items-center justify-start">
                    {instance.instanceId}
                  </div>
                </TableCell>
                <TableCell className="p-0">
                  <div className="p-1 rounded-lg flex items-center justify-start">
                    {instance.imageId}
                  </div>
                </TableCell>
                <TableCell className="p-0">
                  <div className="p-1 rounded-lg flex items-center justify-start">
                    {instance.instanceType}
                  </div>
                </TableCell>
                <TableCell className="p-0">
                  <div className="p-1 rounded-lg flex items-center justify-start">
                    {instance.instanceStateName}
                  </div>
                </TableCell>
                <TableCell className="p-0">
                  <div className="p-1 rounded-lg flex items-center justify-start">
                    {instance.monitoringState}
                  </div>
                </TableCell>
                <TableCell className="flex items-center justify-center gap-2">
                  <VscDebugStart
                    className="cursor-pointer text-[#2ed7ed]"
                    onClick={() => {
                      setCurrentInstanceId(instance.instanceId);
                      setCurrentOperation("START");
                      setTitle(
                        "Are you sure to START " + instance.instanceId + " ?"
                      );
                      onOpen();
                    }}
                  />
                  <FaCircleStop
                    className="cursor-pointer text-[red]"
                    onClick={() => {
                      setCurrentInstanceId(instance.instanceId);
                      setCurrentOperation("STOP");
                      setTitle(
                        "Are you sure to STOP " + instance.instanceId + " ?"
                      );
                      onOpen();
                    }}
                  />
                  <MdRestartAlt
                    className="cursor-pointer text-[#197c19]"
                    onClick={() => {
                      setCurrentInstanceId(instance.instanceId);
                      setCurrentOperation("REBOOT");
                      setTitle(
                        "Are you sure to REBOOT " + instance.instanceId + " ?"
                      );
                      onOpen();
                    }}
                  />
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
      <ConfirmModal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        title={title}
        handleConfirm={handlePutInstance}
      ></ConfirmModal>
    </>
  );
}
