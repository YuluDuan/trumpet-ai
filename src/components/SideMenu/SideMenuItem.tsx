"use client";

import Link from "next/link";
import Image from "next/image";
import { SignOutButton } from "@clerk/clerk-react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface SideMenuItemProps {
  icon: any;
  label: string;
  active?: boolean;
  href: string;
  platform?: string;
}

const SideMenuItem = ({
  icon: Icon,
  label,
  active,
  href,
  platform,
}: SideMenuItemProps) => {
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }
  return (
    <>
      {!platform && label === "Log Out" ? (
        <SignOutButton
          signOutCallback={() => {
            router.push("/");
          }}
        >
          <div
            className={`side-items-link ${platform ? "platfrom-items" : ""} ${
              platform && active
                ? `item-active-platfrom item-${platform}`
                : !platform && active
                ? "item-active"
                : ""
            }`}
          >
            <span className="padding-item">
              <Icon size={22} />
              <p>{label}</p>
            </span>
          </div>
        </SignOutButton>
      ) : (
        <Link
          className={`side-items-link ${platform ? "platfrom-items" : ""} ${
            platform && active
              ? `item-active-platfrom item-${platform}`
              : !platform && active
              ? "item-active"
              : ""
          }`}
          href={href}
        >
          <span className="padding-item">
            {!platform && <Icon size={22} />}
            {platform && (
              <Image src={Icon} height={40} width={40} alt="platform icon" />
            )}
            <p>{label}</p>
          </span>
          <div className="custom-border"></div>
        </Link>
      )}
    </>
  );
};

export default SideMenuItem;
