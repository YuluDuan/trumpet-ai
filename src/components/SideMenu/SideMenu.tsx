"use client";

import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

import { GoHome } from "react-icons/go";
import { MdOutlineSubscriptions } from "react-icons/md";
import { AiOutlineSetting } from "react-icons/ai";
import { LuLogOut } from "react-icons/lu";
import SideMenuHeader from "../SideMenuHeader/SideMenuHeader";
import SideMenuItem from "./SideMenuItem";

const SideMenu = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

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
        icon: MdOutlineSubscriptions,
        label: "Subscriptions",
        href: "/user/subscriptions",
        active: pathname === "/user/subscriptions",
      },

      {
        icon: AiOutlineSetting,
        label: "Setting as Default",
        href: "/user/default-setting/Instagram",
        active:
          pathname !== "/" &&
          pathname !== "/generate-blurb" &&
          pathname !== "/user/subscriptions",
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

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <nav className="sidemenu-container">
        <SideMenuHeader />

        <div className="menu-options">
          {routes.map((item) => (
            <SideMenuItem key={item.label} {...item} />
          ))}
        </div>
      </nav>
    </>
  );
};

export default SideMenu;
