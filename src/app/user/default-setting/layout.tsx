import PlatformSubLeftBar from "@/components/PlatformSubLeftBar/PlatformSubLeftBar";
import { quicksand } from "../../font";

export default function DefaultSettingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={`default-setting-container ${quicksand.className}`}>
      <PlatformSubLeftBar />
      <div className="default-setting-right">{children}</div>
    </div>
  );
}
