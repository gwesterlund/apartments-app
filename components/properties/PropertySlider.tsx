import React from "react";
import { useState } from "react";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import Image from "next/image";

export default function PropertySlider() {
  const [currentSlide, setCurrentSlide] = React.useState(0);
  const [loaded, setLoaded] = useState(false);

  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    initial: 0,
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel);
    },
    created() {
      setLoaded(true);
    },
    loop: true,
    breakpoints: {
      "(min-width: 576px)": {
        slides: { perView: 2, spacing: 10 },
      },
      "(min-width: 992px)": {
        slides: { perView: 4, spacing: 10 },
      },
      // "(min-width: 1200px)": {
      //   slides: { perView: 1, spacing: 10 },
      // },
    },
    slides: { perView: 1 },
  });
  return (
    <>
      <div className="navigation-wrapper">
        <div ref={sliderRef} className="keen-slider">
          <div className="keen-slider__slide number-slide1 image-container">
            <Image
              className="image"
              src="/apartment-slide-1.jpg"
              alt="First slide"
              fill
            />
          </div>
          <div className="keen-slider__slide number-slide2 image-container">
            <Image
              className="image"
              src="/apartment-slide-1.jpg"
              alt="First slide"
              fill
            />
          </div>
          <div className="keen-slider__slide number-slide3 image-container">
            <Image
              className="image"
              src="/apartment-slide-1.jpg"
              alt="First slide"
              fill
            />
          </div>
          <div className="keen-slider__slide number-slide4 image-container">
            <Image
              className="image"
              src="/apartment-slide-1.jpg"
              alt="First slide"
              fill
            />
          </div>
          <div className="keen-slider__slide number-slide5 image-container">
            <Image
              className="image"
              src="/apartment-slide-1.jpg"
              alt="First slide"
              fill
            />
          </div>
          <div className="keen-slider__slide number-slide6 image-container">
            <Image
              className="image"
              src="/apartment-slide-1.jpg"
              alt="First slide"
              fill
            />
          </div>
        </div>
        {loaded && instanceRef.current && (
          <>
            <Arrow
              left
              onClick={(e: any) =>
                e.stopPropagation() || instanceRef.current?.prev()
              }
              disabled={currentSlide === 0}
            />

            <Arrow
              onClick={(e: any) =>
                e.stopPropagation() || instanceRef.current?.next()
              }
              disabled={
                currentSlide ===
                instanceRef.current.track.details.slides.length - 1
              }
            />
          </>
        )}
      </div>
      {/* {loaded && instanceRef.current && (
      <>
        <div></div>
        <div className="dots" style={{ display: "none" }}>
          {[
            ...Array(instanceRef.current.track.details.slides.length).keys(),
          ].map((idx) => {
            return (
              <button
                key={idx}
                onClick={() => {
                  instanceRef.current?.moveToIdx(idx);
                }}
                className={"dot" + (currentSlide === idx ? " active" : "")}
              ></button>
            );
          })}
        </div>
        
      </>
    )} */}
    </>
  );
}

function Arrow(props: {
  disabled: boolean;
  left?: boolean;
  onClick: (e: any) => void;
}) {
  const disabeld = props.disabled ? " arrow--disabled" : "";
  return (
    <svg
      onClick={props.onClick}
      className={`arrow ${
        props.left ? "arrow--left" : "arrow--right"
      } ${disabeld}`}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
    >
      {props.left && (
        <path d="M16.67 0l2.83 2.829-9.339 9.175 9.339 9.167-2.83 2.829-12.17-11.996z" />
      )}
      {!props.left && (
        <path d="M5 3l3.057-3 11.943 12-11.943 12-3.057-3 9-9z" />
      )}
    </svg>
  );
}
