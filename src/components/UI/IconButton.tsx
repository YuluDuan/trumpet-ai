import React, { MouseEventHandler } from "react";

interface IconButtonProps {
  onClick?: MouseEventHandler<HTMLButtonElement> | undefined;
  icon: React.ReactElement;
}

const IconButton = ({ onClick, icon }: IconButtonProps) => {
  return (
    <button onClick={onClick} className="tool_btn">
      {icon}
    </button>
  );
};

export default IconButton;
