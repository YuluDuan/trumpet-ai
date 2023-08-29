"use client";

import { usePathname } from "next/navigation";
import { useMemo } from "react";

import { GoHome } from "react-icons/go";
import { AiOutlineSetting } from "react-icons/ai";
import { LuLogOut } from "react-icons/lu";
import SideMenuHeader from "../SideMenuHeader/SideMenuHeader";
import SideMenuItem from "./SideMenuItem";

const SideMenu = () => {
  let pathname = usePathname();

  // Truncate [platform] from pathname if it exists for match below to succeed
  if (pathname.startsWith("/user/default-setting")) {
    pathname = "/user/default-setting";
  }
  const routes = useMemo(
    () => [
      {
        icon: GoHome,
        label: "Home",
        href: "/generate-blurb",
        active: pathname === "/generate-blurb",
      },

      {
        icon: AiOutlineSetting,
        label: "Setting as Default",
        href: "/user/default-setting/Instagram",
        active: pathname !== "/" && pathname !== "/generate-blurb",
      },
      {
        icon: LuLogOut,
        label: "Log Out",
        href: "/",
        active: pathname === "/",
      },
    ],
    [pathname]
  );

  return (
    <>
      <nav className="sidemenu-container">
        <SideMenuHeader />

        <div className="menu-options">
          {routes.map((item) => (
            <SideMenuItem key={item.label} {...item} isPlatform={false} />
          ))}
        </div>
      </nav>
    </>
  );
};

export default SideMenu;
