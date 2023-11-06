import { quicksand } from "../../font";
import "@/sass/subscription.scss";

export default function SubscriptionLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className={`subscription-containter ${quicksand.className}`}>
      {children}
    </section>
  );
}
