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
import { useEffect, useState } from "react";
import { FaCircleStop } from "react-icons/fa6";
import { MdRestartAlt } from "react-icons/md";
import { VscDebugStart } from "react-icons/vsc";
import ConfirmModal from "./confirmModal";
import { testInstanceList } from "@/app/constants/testInstanceList";

export default function MainPage({
  admintestAuthorization,
}: {
  admintestAuthorization: string;
}) {
  const [instanceList, setInstanceList] = useState<Array<EC2Instance>>([]);
  const [title, setTitle] = useState("");
  const [currentInstanceId, setCurrentInstanceId] = useState("");
  const [currentOperation, setCurrentOperation] = useState("");

  const getInstance = async() => {
    const res= process.env.NEXT_PUBLIC_TEST === "test"
      ? testInstanceList
      : (await API.getInstances(admintestAuthorization)).data;
    // @ts-ignore
    setInstanceList(res);
  };

  useEffect(() => {
    getInstance();
  }, []);

  const handlePutInstance = async () => {
    if (process.env.NEXT_PUBLIC_TEST === "test") {
      success(currentOperation + " " + currentInstanceId + " successfully !");
    } else {
      API.putInstance(
        currentInstanceId,
        currentOperation,
        admintestAuthorization
      )
        .then((res) => {
          if (res.status === 200) {
            success(
              currentOperation + " " + currentInstanceId + " successfully !"
            );
          }
        })
        .finally(() => {
          API.getInstances(admintestAuthorization).then((res) => {
            // @ts-ignore
            if (res.status === 200 && res.data) setInstanceList(res.data);
          });
        });
    }
  };
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  return (
    <>
      {instanceList.length != 0 && (
        <Table
          aria-label="Example static collection table"
          className=" max-h-full overflow-scroll no-scrollbar"
          classNames={{
            wrapper: " max-h-full overflow-scroll no-scrollbar bg-[#ffffff66]",
          }}
          isHeaderSticky={true}
        >
          <TableHeader>
            <TableColumn className="bg-[#ffffffcc]">Instance Name</TableColumn>
            <TableColumn className="bg-[#ffffffcc]">Instance Id</TableColumn>
            <TableColumn className="bg-[#ffffffcc]">Image Id</TableColumn>
            <TableColumn className="bg-[#ffffffcc]">Instance Type</TableColumn>
            <TableColumn className="bg-[#ffffffcc]">
              Instance State Name
            </TableColumn>
            <TableColumn className="bg-[#ffffffcc]">
              Monitoring State
            </TableColumn>
            <TableColumn className="bg-[#ffffffcc]">Operation</TableColumn>
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
                      className="cursor-pointer text-[#2a4ac1]"
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
                      className="cursor-pointer text-[#ff7a28]"
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
      )}

      <ConfirmModal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        title={title}
        handleConfirm={handlePutInstance}
      ></ConfirmModal>
    </>
  );
}
