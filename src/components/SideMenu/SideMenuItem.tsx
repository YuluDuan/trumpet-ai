import Link from "next/link";
import Image from "next/image";

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
  return (
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
  );
};

export default SideMenuItem;
