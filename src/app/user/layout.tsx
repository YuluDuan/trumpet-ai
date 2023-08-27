import "@/sass/main.scss";
import { quicksand } from "../font";
import SideMenu from "@/components/SideMenu/SideMenu";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={quicksand.className}>
      <body>
        <SideMenu />
        {children}
      </body>
    </html>
  );
}
