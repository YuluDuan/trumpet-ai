import Image from "next/image";

const UserHeader = () => {
  return (
    <div className="UserHeader">
      <Image
        src="/assets/avatar2.png"
        height={50}
        width={50}
        alt="avatar"
        className="user-header-avatar"
      />
    </div>
  );
};

export default UserHeader;
