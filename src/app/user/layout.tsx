import "@/sass/main.scss";
import { quicksand } from "../font";
import SideMenu from "@/components/SideMenu/SideMenu";
import UserHeader from "@/components/UserHeader/UserHeader";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={quicksand.className}>
      <body className="user-center">
        <SideMenu />
        <div className="user-center-right">
          <UserHeader />
          {children}
        </div>
      </body>
    </html>
  );
}
