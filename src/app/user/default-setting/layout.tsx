import PlatformSubLeftBar from "@/components/PlatformSubLeftBar/PlatformSubLeftBar";
import { quicksand } from "../../font";

export default function DefaultSettingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={quicksand.className}>
      <PlatformSubLeftBar />
      {children}
    </div>
  );
}
