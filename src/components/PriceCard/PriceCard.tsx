"use client";

import Image from "next/image";
import * as Progress from "@radix-ui/react-progress";
import { useState } from "react";
import { useRouter } from "next/navigation";

const PriceCard = () => {
  const router = useRouter();
  const [progress, setProgress] = useState(44);
  return (
    <div className="price-card-container">
      <div className="price-content">
        <div className="price-title">
          <span className="price-num">$0</span>
          <div className="price-badge">$11.99/month</div>
        </div>
        <p className="price-cotent-1">Benefits for first 100 users</p>
        <div className="price-line"></div>
        <ul className="list-price">
          <li>
            <Image
              src={"/assets/checklist.svg"}
              width={19}
              height={20}
              alt="check mark"
            />
            20 free generations
          </li>
          <li>
            <Image
              src={"/assets/checklist.svg"}
              width={19}
              height={20}
              alt="check mark"
            />
            All advanced features
          </li>
          <li>
            <Image
              src={"/assets/checklist.svg"}
              width={19}
              height={20}
              alt="check mark"
            />
            Premier customer support
          </li>
        </ul>

        <div className="progress-bar-group">
          <div className="progress-bar">
            <Progress.Root className="ProgressRoot" value={progress}>
              <Progress.Indicator
                className="ProgressIndicator"
                style={{ transform: `translateX(-${100 - progress}%)` }}
              />
            </Progress.Root>

            <p style={{ color: "#FFF" }}>{progress}/100 </p>
          </div>
          <p className="chance">You still have chance!</p>
        </div>

        <button
          type="button"
          onClick={() => router.push("/sign-up")}
          className="price-btn"
        >
          Join Now
        </button>
      </div>
    </div>
  );
};

export default PriceCard;
