import React, { useState } from "react";
import Carousel from "react-bootstrap/Carousel";
import Slidepic1 from "../assets/Slidepic1.jpg";
import Slidepic2 from "../assets/Slidepic2.jpg";
import Slidepic3 from "../assets/Slidepic3.jpg";
import Slidepic4 from "../assets/Slidepic4.jpg";
import Slidepic5 from "../assets/Slidepic5.jpg";

const data = [
  {
    image: Slidepic1,
    caption: "Joy and Fun in Learning",
    description: "Discover the world of Mathematics and Computer Science",
  },
  {
    image: Slidepic2,
    caption: "Collaboration and Teamwork",
    description: "Learning and growing together",
  },
  {
    image: Slidepic3,
    caption: "Equal Opportunities",
    description: "Space for all. Embracing diversity",
  },
  {
    image: Slidepic4,
    caption: "Ambience and Atmosphere",
    description: "Learning in a pleasant environment",
  },
  {
    image: Slidepic5,
    caption: "Organized and Structured",
    description: "We help you find your path",
  },
];

function HomeCarousel() {
  const [index, setIndex] = useState(0);
  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
      }}
    >
      <Carousel
        activeIndex={index}
        onSelect={handleSelect}
        interval={5000}
        pause={false} // verhindert, dass das Karussell stoppt
      >
        {data.map((slide, i) => (
          <Carousel.Item key={i} style={{ height: "100vh" }}>
            <img
              className="d-block w-100"
              src={slide.image}
              alt="slider image"
              style={{ objectFit: "cover", width: "100%", height: "100vh" }}
            />
            <Carousel.Caption className="carousel-custom-caption">
              <h3>{slide.caption}</h3>
              <p>{slide.description}</p>
            </Carousel.Caption>
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
}

export default HomeCarousel;
