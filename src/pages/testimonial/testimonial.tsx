import React, { useRef } from "react";
import "./testimonial.css";
import sparkles from "../../images/sparkles.svg";
import arrowLeft from "../../images/arrow-left-circle.svg";
import arrowRight from "../../images/arrow-right-circle.svg";

export type Testimonial = {
  avatar: string;
  platform: string;
  name: string;
  text: string;
};

export function Testimonials(props: TestimonialProps) {
  const listRef = useRef<HTMLDivElement>(null);
  let cardWidth = 570;

  let scrollForward = () => {
    listRef?.current?.scrollBy({
      behavior: "smooth",
      left: cardWidth,
      top: 0,
    });
  };

  let scrollBackwards = () => {
    listRef?.current?.scrollBy({
      behavior: "smooth",
      left: -cardWidth,
      top: 0,
    });
  };

  const testimonialList = props.props.map((testimonial) => {
    return (
      <div className="card">
        <h1 className="font-bold">“</h1>
        <p>{testimonial.text}</p>
        <div className="contact">
          <img className="avatar" src={testimonial.avatar} alt="avatar-1" />
          <h6>{testimonial.name}</h6>
          <img className="social" src={testimonial.platform} alt="spotify" />
        </div>
      </div>
    );
  });

  return (
    <section className="testimonial">
      <header>
        <img src={sparkles} alt="" />
        <h1 className="font-bold lg:text-6xl md:text-4xl sm:text-4xl">
          What our listeners say
        </h1>
        <h3>Their experience throughout every platform</h3>
      </header>
      <div className="testimonials-wrapper" ref={listRef}>
        <div className="testimonial-list">{testimonialList}</div>
      </div>
      <div className="card-navigation">
        <img src={arrowLeft} alt="Scroll left" onClick={scrollBackwards} />
        <img src={arrowRight} alt="Scroll right" onClick={scrollForward} />
      </div>
    </section>
  );
}

type TestimonialProps = {
  props: Testimonial[];
};