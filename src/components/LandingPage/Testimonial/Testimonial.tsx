import Image from "next/image";
import TestimonialCard from "./TestimonialCard/TestimonialCard";
import { TestimonialContent } from "@/lib/utils";
const Testimonial = () => {
  return (
    <div className="testimonial">
      <div className="testimonial-header">
        <Image
          src="/assets/boy2.png"
          width={124}
          height={124}
          alt="writing prompt"
          className="boy2"
        />

        <p>How the content creators say</p>
        <Image
          src="/assets/Line.svg"
          height={20}
          width={130}
          alt="line"
          className="line"
        />
      </div>
      <div className="testimonial-grids">
        <div className="first-block">
          {TestimonialContent.slice(0, 2).map((testimonial, index) => (
            <TestimonialCard key={index} testimonial={testimonial} />
          ))}
        </div>

        <div className="second-block">
          {TestimonialContent.slice(2).map((testimonial, index) => (
            <TestimonialCard key={index} testimonial={testimonial} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Testimonial;
