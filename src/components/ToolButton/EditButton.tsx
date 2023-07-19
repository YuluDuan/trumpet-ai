import { MdOutlineModeEdit } from "react-icons/md";

const EditButton = ({ editorRef }: any) => {
  const handleEditButtonClick = () => {
    if (editorRef.current) {
      editorRef.current.focus();
    }
  };
  return (
    <button onClick={handleEditButtonClick} className="tool_btn">
      <MdOutlineModeEdit />
    </button>
  );
};

export default EditButton;
