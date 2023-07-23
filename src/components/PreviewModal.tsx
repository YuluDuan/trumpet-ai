"use client";

import Modal from "./UI/Modal/Modal";
import { useDispatch, useSelector } from "react-redux";
import { previewModalActions } from "../store/preview-slice";
import { RootState } from "../store";

const PreviewModal = () => {
  const { isOpen, data: blurbData } = useSelector(
    (state: RootState) => state.preview
  );
  const dispatch = useDispatch();

  if (!blurbData?.textContent || blurbData?.textContent === "") {
    return null;
  }

  return (
    <Modal
      open={isOpen}
      onClose={() => dispatch(previewModalActions.onCloseModal())}
    >
      <p>{blurbData.textContent}</p>
      <small>{blurbData.platform}</small>
    </Modal>
  );
};

export default PreviewModal;
