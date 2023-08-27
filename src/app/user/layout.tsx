import "@/sass/main.scss";
import { quicksand } from "../font";
import SideMenu from "@/components/SideMenu/SideMenu";
import UserHeader from "@/components/UserHeader/UserHeader";

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className={`user-center ${quicksand.className}`}>
      <SideMenu />
      <div className="user-center-right">
        <UserHeader />
        {children}
      </div>
    </section>
  );
}
