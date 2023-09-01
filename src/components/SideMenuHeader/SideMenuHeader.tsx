import Image from "next/image";
import Link from "next/link";

const SideMenuHeader = () => {
  return (
    <div className="sidemenu-header-container">
      <Link href="/generate-blurb">
        <Image
          src="/assets/user-center-logo.jpeg"
          height={50}
          width={50}
          alt="trumpet ai logo"
          className="user-center-logo"
        />
      </Link>
      <div className="user-center-brandname">Trumpet.ai</div>
    </div>
  );
};

export default SideMenuHeader;
