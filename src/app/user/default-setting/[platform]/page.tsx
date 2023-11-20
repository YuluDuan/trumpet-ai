import { fetchUserPlatformConfig } from "@/actions/platformConfig.actions";
import DefaultSettingCard from "@/components/DefaultSettingCard/DefaultSettingCard";
import { PLATFORM_IMAGE, imageMatch } from "@/lib/utils";
import Image from "next/image";

const PlatformPage = async ({ params }: { params: { platform: string } }) => {
  const platformConfigs = await fetchUserPlatformConfig(params.platform);
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
      <DefaultSettingCard
        platform={params.platform}
        platformConfigs={platformConfigs}
      />
    </div>
  );
};

export default PlatformPage;
