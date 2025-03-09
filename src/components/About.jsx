import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import UniBuilding from "../assets/unibuilding.jpg"; // Pfad zum Bild

function About() {
  return (
    <>
      <Header />
      <div
        className="container my-5"
        style={{ paddingTop: "80px", paddingBottom: "80px" }}
      >
        {/* Bild-Banner oberhalb der Überschrift */}
        <div className="mb-4">
          <img
            src={UniBuilding}
            alt="University Building"
            className="img-fluid"
            style={{ width: "100%" }}
          />
        </div>
        <h1 className="mb-4">About Dream University</h1>
        <p>
          Dream University is a visionary institution committed to excellence in
          teaching and research. Our mission is to empower students with the
          knowledge and skills to thrive in a rapidly evolving world.
        </p>
        <p>
          At Dream University, we embrace diversity, encourage innovative
          thinking, and foster a supportive academic community. With
          state-of-the-art facilities, a dynamic curriculum, and world-class
          faculty, we prepare our students to become leaders in their fields.
        </p>
        <h2 className="mt-5">Our Vision</h2>
        <p>
          We envision a world where education transcends boundaries and
          transforms lives. At Dream University, we strive to be at the
          forefront of academic innovation and global impact.
        </p>
        <h2 className="mt-4">Our Mission</h2>
        <p>
          Our mission is to provide an inspiring educational environment that
          nurtures intellectual curiosity and fosters personal and professional
          growth. We are dedicated to cultivating future leaders who will make a
          positive impact on the world.
        </p>
      </div>
      <Footer />
    </>
  );
}

export default About;
