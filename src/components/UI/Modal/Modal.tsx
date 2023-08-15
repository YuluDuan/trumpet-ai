"use client";

import { Dialog, Transition } from "@headlessui/react";
import IconButton from "@/components/UI/IconButton";
import { RxCross1 } from "react-icons/rx";
import { Fragment } from "react";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  platform: string;
  children: React.ReactNode;
  selectedButton: string;
}

const Modal: React.FC<ModalProps> = ({
  open,
  onClose,
  platform,
  children,
  selectedButton,
}) => {
  return (
    <Transition show={open} appear as={Fragment}>
      <Dialog open={open} onClose={() => {}}>
        <div className="dialog-overlay" />

        <Dialog.Panel
          className={`dialog-panel ${
            selectedButton === "mobile"
              ? "w-375"
              : platform === "Instagram" || platform === "TikTok"
              ? "w-1000"
              : ""
          }`}
        >
          <div className="dialog-content">
            <div className="cross-icon">
              <IconButton onClick={onClose} icon={<RxCross1 />} />
            </div>
            {children}
          </div>
        </Dialog.Panel>
      </Dialog>
    </Transition>
  );
};

export default Modal;
