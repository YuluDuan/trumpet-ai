"use client";

import { useState } from "react";

export const SubscriptionButton = ({ isPro = false }: { isPro: boolean }) => {
  const [loading, setLoading] = useState(false);

  const onClick = async () => {
    try {
      setLoading(true);

      const response = await fetch("/api/stripe");
      const data = await response.json();

      window.location.href = data.url;
    } catch (error) {
      console.error("error", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      disabled={loading}
      onClick={onClick}
      className="brand_color_title subscription-btn"
    >
      {isPro ? "Manage Subscription" : "Upgrade your plan"}
    </button>
  );
};
