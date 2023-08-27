import Link from "next/link";
import Image from "next/image";

interface SideMenuItemProps {
  icon: any;
  label: string;
  active?: boolean;
  href: string;
  isPlatform: boolean;
}

const SideMenuItem = ({
  icon: Icon,
  label,
  active,
  href,
  isPlatform,
}: SideMenuItemProps) => {
  return (
    <Link
      className={`side-items-link ${
        isPlatform && active
          ? "item-active-platfrom"
          : !isPlatform && active
          ? "item-active"
          : ""
      }`}
      href={href}
    >
      {!isPlatform && <Icon size={22} />}
      {isPlatform && (
        <Image src={Icon} height={40} width={40} alt="platform icon" />
      )}
      <p>{label}</p>
    </Link>
  );
};

export default SideMenuItem;
