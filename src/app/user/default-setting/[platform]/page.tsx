import DefaultSettingCard from "@/components/DefaultSettingCard/DefaultSettingCard";
import { SubscriptionButton } from "@/components/SubscriptionButton/SubscriptionButton";
import { PLATFORM_IMAGE, imageMatch } from "@/lib/utils";
import Image from "next/image";

const PlatformPage = ({ params }: { params: { platform: string } }) => {
  return (
    <div className="plaformPage-container">
      <header className="platformHeader">
        <Image
          src={imageMatch(params.platform, PLATFORM_IMAGE)}
          height={40}
          width={40}
          alt="platform icon"
        />
        <div className="platform-name">{params.platform}</div>
      </header>
      <DefaultSettingCard platform={params.platform} />

      {/* testing */}
      <SubscriptionButton isPro={false} />
    </div>
  );
};

export default PlatformPage;
