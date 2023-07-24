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
      <div className="modal-content">
        <div className="modal-title">
          <div className="modal-platform">
            <img src={blurbData.img} />
            <span>{blurbData.platform}</span>
          </div>

          <div className="button-group" role="group">
            <button type="button">Mobile</button>
            <button type="button">Web</button>
          </div>
        </div>

        <div className="preview-content">
          <p>{blurbData.textContent}</p>
        </div>
      </div>
    </Modal>
  );
};

export default PreviewModal;
