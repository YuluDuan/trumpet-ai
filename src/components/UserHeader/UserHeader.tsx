import { UserButton } from "@clerk/nextjs";

const UserHeader = () => {
  return (
    <div className="UserHeader">
      <div className="user-header-avatar">
        <UserButton afterSignOutUrl="/" />
      </div>
    </div>
  );
};

export default UserHeader;
