"use client";
import {
  Modal,
  ModalContent,
  Button,
  ModalHeader,
  ModalFooter,
} from "@nextui-org/react";

export default function ConfirmModal({
  isOpen,
  onOpenChange,
  title,
  handleConfirm,
}: {
  isOpen: boolean;
  onOpenChange: () => void;
  title: string;
  handleConfirm: () => void;
}) {
  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="center">
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">{title}</ModalHeader>
            <ModalFooter>
              <Button
                color="danger"
                className="bg-[#d9d9d6]"
                variant="flat"
                onPress={onClose}
              >
                Cancel
              </Button>
              <Button
                color="primary"
                className="bg-[#96a8b3]"
                onPress={() => {
                  handleConfirm();
                  onClose();
                }}
              >
                Confirm
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
