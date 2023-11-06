import { SubscriptionButton } from "@/components/SubscriptionButton/SubscriptionButton";
import SubscriptionTable from "@/components/SubscriptionTable/SubscriptionTable";
import { checkSubscription } from "@/lib/subscription";
import React from "react";

const SubscriptionPage = async () => {
  const isPro = await checkSubscription();
  return (
    <div className="subscription-page">
      <h3>Manage Subscriptions</h3>
      <SubscriptionTable />
      <SubscriptionButton isPro={isPro} />
    </div>
  );
};

export default SubscriptionPage;
