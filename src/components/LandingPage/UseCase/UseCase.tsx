import Image from "next/image";
import Link from "next/link";
function TryNow() {
  return (
    <Link className="try-now-btn" href="/sign-up">
      <span className="brand_color_title try-now">Try now</span>
      <Image src="/assets/arrow-try.svg" height={20} width={22} alt="try now" />
    </Link>
  );
}
const UseCase = () => {
  return (
    <div id="use_case" className="use_case_container">
      <div className="line-flex">
        <p>How does Trumpet work?</p>
        <Image src="/assets/Line.svg" height={20} width={130} alt="line" />
      </div>

      <div className="features_block">
        {/* First Block */}
        <div className="write_prompts feature-block">
          <div className="left_block">
            <p className="left_block_title">
              TrumpetAI helps you{" "}
              <span className="brand_color_title">write the best prompts</span>
            </p>
            <ul>
              <li>Enter the basic information of your content</li>
              <li>Choose the your channels</li>
              <li>Generate emojis and hashtags</li>
            </ul>
            <TryNow />
          </div>
          <Image
            src="/assets/prompt.png"
            height={566}
            width={648}
            alt="prompt image"
            className="page-image"
          />
        </div>
        {/* End of the First Block */}

        {/* Second Block */}
        <div className="write_prompts feature-block">
          <Image
            src="/assets/page-imge2.png"
            height={460.679}
            width={648}
            alt="prompt image"
            className="page-image"
          />
          <div className="left_block">
            <p className="left_block_title brand_color_title">
              Trumpet.ai curates marketing brief for different social medias
            </p>
            <ul>
              <li>Character limit</li>
              <li>Content tone</li>
              <li>Emoji style</li>
              <li>Number of hashtags</li>
            </ul>
            <TryNow />
          </div>
        </div>
        {/* The end of Second Block */}

        {/* Third Block */}
        <div className="write_prompts feature-block">
          <div className="left_block">
            <p className="left_block_title brand_color_title">
              Trumpet.ai enables you to finish the last 5% of the perfect
              writing
            </p>
            <ul>
              <li>Generate variants of briefs</li>
              <li>Regenerate, shorten and lengthen your briefs</li>
              <li>Decide the tone</li>
              <li>Customize emojis</li>
            </ul>
            <TryNow />
          </div>
          <Image
            src="/assets/page-image3.png"
            height={455.757}
            width={648}
            alt="prompt image"
            className="page-image"
          />
        </div>

        {/* The end of Third Block */}

        {/* Fourth Block */}
        <div className="write_prompts feature-block">
          <Image
            src="/assets/page-image4.png"
            height={463.953}
            width={648}
            alt="prompt image"
            className="page-image"
          />
          <div className="left_block">
            <p className="left_block_title brand_color_title">
              Review the final briefs and share with one click
            </p>
            <ul>
              <li>Web version</li>
              <li>Mobile version</li>
            </ul>
            <TryNow />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UseCase;
