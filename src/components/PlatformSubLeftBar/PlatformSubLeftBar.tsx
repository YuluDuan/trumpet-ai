"use client";

import React, { useMemo } from "react";
import SideMenuItem from "../SideMenu/SideMenuItem";
import { usePathname } from "next/navigation";

import Instagram from "../../../public/assets/ins.svg";
import LinkedIn from "../../../public/assets/linkedin.svg";
import Twitter from "../../../public/assets/twitter.svg";
import TikTok from "../../../public/assets/tiktok.png";

const PlatformSubLeftBar = () => {
  const pathname = usePathname();
  const routes = useMemo(
    () => [
      {
        icon: Instagram,
        label: "Instagram",
        href: "/user/default-setting/Instagram",
        active:
          pathname !== "/user/default-setting/LinkedIn" &&
          pathname !== "/user/default-setting/Twitter" &&
          pathname !== "/user/default-setting/TikTok",
      },
      {
        icon: LinkedIn,
        label: "LinkedIn",
        href: "/user/default-setting/LinkedIn",
        active: pathname === "/user/default-setting/LinkedIn",
      },
      {
        icon: Twitter,
        label: "Twitter",
        href: "/user/default-setting/Twitter",
        active: pathname === "/user/default-setting/Twitter",
      },
      {
        icon: TikTok,
        label: "TikTok",
        href: "/user/default-setting/TikTok",
        active: pathname === "/user/default-setting/TikTok",
      },
    ],
    [pathname]
  );
  return (
    <>
      <nav className="platform-menu-container">
        {routes.map((item) => (
          <SideMenuItem key={item.label} {...item} platform={item.label} />
        ))}
      </nav>
    </>
  );
};

export default PlatformSubLeftBar;
