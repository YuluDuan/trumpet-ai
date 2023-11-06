import SubscriptionTable from "@/components/SubscriptionTable/SubscriptionTable";
import React from "react";

const SubscriptionPage = () => {
  return (
    <div className="subscription-page">
      <h3>Manage Subscriptions</h3>
      <SubscriptionTable />
    </div>
  );
};

export default SubscriptionPage;
