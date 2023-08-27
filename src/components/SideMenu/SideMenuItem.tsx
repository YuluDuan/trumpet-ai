import Link from "next/link";
import React from "react";
import { IconType } from "react-icons";

interface SideMenuItemProps {
  icon: IconType;
  label: string;
  active?: boolean;
  href: string;
}

const SideMenuItem = ({
  icon: Icon,
  label,
  active,
  href,
}: SideMenuItemProps) => {
  return (
    <Link
      className={`side-items-link ${active ? "item-active" : ""}`}
      href={href}
    >
      <Icon size={22} />
      <p>{label}</p>
    </Link>
  );
};

export default SideMenuItem;
