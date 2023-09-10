import { TestimonialContent } from "@/lib/utils";
import Image from "next/image";

interface TestimonialCardProps {
  testimonial: TestimonialContent;
}

const TestimonialCard = ({ testimonial }: TestimonialCardProps) => {
  return (
    <div
      className="TestimonialCard"
      style={{ width: testimonial.width, height: testimonial.height }}
    >
      <div className="testimonialCard-header">
        <Image
          src={testimonial.avatar}
          width={65}
          height={65}
          alt="testimonial"
        />
        <div className="testimonialCard-name">
          <h2>{testimonial.name}</h2>
          <p>{testimonial.work_position}</p>
        </div>
      </div>
      <div className="testimonialCard-content">
        <h3>{testimonial.summary}</h3>
        <p>{testimonial.content}</p>
      </div>
    </div>
  );
};

export default TestimonialCard;
