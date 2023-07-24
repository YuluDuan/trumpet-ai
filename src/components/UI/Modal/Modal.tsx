"use client";

import { Dialog, Transition } from "@headlessui/react";
import IconButton from "@/components/UI/IconButton";
import { RxCross1 } from "react-icons/rx";
import { Fragment } from "react";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ open, onClose, children }) => {
  return (
    <Transition show={open} appear as={Fragment}>
      <Dialog open={open} onClose={onClose}>
        <div className="dialog-overlay" />

        <Dialog.Panel className="dialog-panel">
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
