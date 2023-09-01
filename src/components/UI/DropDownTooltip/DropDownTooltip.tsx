"use client";

import * as Tooltip from "@radix-ui/react-tooltip";
import Image from "next/image";

const DropDownTooltip = () => {
  return (
    <Tooltip.Provider>
      <Tooltip.Root>
        <Tooltip.Trigger asChild>
          <button className="IconButton">
            <Image
              src={"/assets/tooltip.svg"}
              height={20}
              width={20}
              alt="tooltip"
            />
          </button>
        </Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Content
            className="TooltipContent"
            sideOffset={5}
            side="bottom"
            align="end"
          >
            <h4>Indication:</h4>
            <p>
              The default tone is defined by trumpetAI based analysis of
              platforms.
            </p>
          </Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  );
};

export default DropDownTooltip;
