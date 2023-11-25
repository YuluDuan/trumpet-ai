import { fetchNumOfUsers } from "@/actions/user.actions";

import LandingPageFooter from "@/components/LandingPage/LandingPageFooter/LandingPageFooter";
import LandingPageHeader from "@/components/LandingPage/LandingPageHeader/LandingPageHeader";
import PriceCard from "@/components/PriceCard/PriceCard";

const PricePage = async () => {
  const numOfUsers = await fetchNumOfUsers();
  return (
    <section className="price-page">
      <LandingPageHeader />
      <div className="main-price-content">
        <h1>Our Pricing</h1>
        <p className="main-price-p">
          Embark on the new journey of unleashing the impact of your content.
          Try us for free now!
        </p>
        <PriceCard numOfUsers={numOfUsers} />
      </div>
      <LandingPageFooter />
    </section>
  );
};

export default PricePage;
