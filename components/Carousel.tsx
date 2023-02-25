import React from "react";
import Image from "next/image";
import { Carousel } from "react-bootstrap";

export default function CustomCarousel() {
  return (
    <Carousel>
      <Carousel.Item interval={1000}>
        <div className="ratio ratio-16x9">
          <Image
            className="d-block w-100"
            src="/apartment-slide-1.jpg"
            alt="First slide"
            fill
          />
        </div>
        <Carousel.Caption>
          <h3>First slide label</h3>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item interval={500}>
        <div className="ratio ratio-16x9 gradThis">
          <Image
            className="d-block w-100"
            src="/apartment-slide-1.jpg"
            alt="Second slide"
            fill
          />
        </div>
        <Carousel.Caption>
          <h3>Second slide label</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <div className="ratio ratio-16x9">
          <Image
            className="d-block w-100"
            src="/apartment-slide-1.jpg"
            alt="Third slide"
            fill
          />
        </div>
        <Carousel.Caption>
          <h3>Third slide label</h3>
          <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}
