import Image from "next/image";
import Link from "next/link";
const LandingPageFooter = () => {
  return (
    <div className="LandingPageFooter-container">
      <div className="logo-footer">
        <Image
          className="landing-logo"
          src="/assets/landingPageLogo.jpeg"
          height={30}
          width={42}
          alt="logo"
        />
        <p>Trumpet.ai</p>
      </div>

      <div className="footer-links">
        <div className="links-footer">
          <Link href="">About</Link>
          <Link href="">Features</Link>
          <Link href="">Blog</Link>
          <Link href="">Video</Link>
          <Link href="">Help</Link>
          <Link href="">Pring</Link>
        </div>
        <div className="links-icon">
          <Link href="">
            <Image
              src="/assets/LinkedinLogo.svg"
              width={32}
              height={32}
              alt="linkedin"
            />
          </Link>
          <Link href="">
            <Image
              src="/assets/SlackLogo.svg"
              width={32}
              height={32}
              alt="SlackLogo"
            />
          </Link>
          <Link href="">
            <Image
              src="/assets/twitter-x.svg"
              width={32}
              height={32}
              alt="twitter"
            />
          </Link>
          <Link href="">
            <Image
              src="/assets/InstagramLogo.svg"
              width={32}
              height={32}
              alt="InstagramLogo"
            />
          </Link>
        </div>
      </div>

      <div className="right-reserve">
        <div className="break-line"></div>
        <p>© Trumpet.ai 2023. All right reserved</p>
      </div>
    </div>
  );
};

export default LandingPageFooter;
