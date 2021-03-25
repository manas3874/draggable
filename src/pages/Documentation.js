import React from "react";
import banner1 from "../assets/homepage-dark-grid.PNG";
import banner2 from "../assets/homepage-light-no-grid.PNG";
import github from "../assets/github.svg";
import link from "../assets/link.svg";
function Documentation() {
  return (
    <div className="documentation-page">
      <div className="documentation-page__banner">
        <h1>Draggable page builder</h1>
        <p>
          This web-app is made using <span>ReactJS</span> and the
          <span> GSAP</span> animation library. This page-builder has features
          like snap-element-to-grid, draggable components, change dimensions of
          elements, Mutate CSS properties, Dark/Light mode. Please visit the
          link below to see the demo, else clone the repository and run{" "}
          <code>npm install && npm start</code> to get started.
        </p>
        <div className="documentation-page__banner--links">
          <a href="https://github.com/manas3874/draggable">
            <img src={github} alt="" />
          </a>
          <a href="https://draggable-js.herokuapp.com/">
            <img src={link} alt="" />
          </a>
        </div>
        <div className="documentation-page__banner--images">
          <img src={banner1} alt="banner-1" />
          <img src={banner2} alt="banner-2" />
        </div>
      </div>
      <p>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quaerat,
        facere dolor amet temporibus modi mollitia nemo impedit nulla fugiat
        magnam alias commodi dolorem sequi repellendus!
      </p>
    </div>
  );
}

export default Documentation;
