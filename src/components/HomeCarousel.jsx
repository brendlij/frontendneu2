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
    caption: "Freude und Spaß am Lernen",
    description: "Entdecke die Welt der Mathematik und Informatik",
  },
  {
    image: Slidepic2,
    caption: "Zusammenarbeit und Teamwork",
    description: "Gemeinsam lernen und wachsen",
  },
  {
    image: Slidepic3,
    caption: "Chancengleichheit",
    description: "Platz für Alle. Wir fördern Vielfalt",
  },
  {
    image: Slidepic4,
    caption: "Ambiente und Atmosphäre",
    description: "Lernen in einer angenehmen Umgebung",
  },
  {
    image: Slidepic5,
    caption: "Organisiert und Strukturiert",
    description: "Wir helfen dir, deinen Weg zu finden",
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
      <Carousel activeIndex={index} onSelect={handleSelect} interval={3000}>
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
