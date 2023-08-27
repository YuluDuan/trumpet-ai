import Image from "next/image";

const SideMenuHeader = () => {
  return (
    <div className="sidemenu-header-container">
      <Image
        src="/assets/user-center-logo.jpeg"
        height={50}
        width={50}
        alt="trumpet ai logo"
        className="user-center-logo"
      />

      <div className="user-center-brandname">Trumpet.ai</div>
    </div>
  );
};

export default SideMenuHeader;
