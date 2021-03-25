import React from "react";
import banner1 from "../assets/homepage-dark-grid.PNG";
import banner2 from "../assets/homepage-light-no-grid.PNG";
import github from "../assets/github.svg";
import link from "../assets/link.svg";
import homepageBlank from "../assets/homepage-blank.svg";
import labelModal from "../assets/label-modal.PNG";
function Documentation() {
  return (
    <div className="documentation-page">
      <section className="documentation-page__banner">
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
      </section>
      <section className="documentation-page__how-to-use">
        <h1>How to use</h1>
        <ul>
          <li>
            <p>
              Visit the{" "}
              <a href="https://draggable-js.herokuapp.com/">online demo</a> for
              testing the application. The application auto-deploys from the{" "}
              <a href="https://github.com/manas3874/draggable">
                Github repository
              </a>
              . All current changes will be updated in the application.
            </p>
          </li>
          <li>
            <p>
              You will be greeted with the homepage of our page-builder app.
              Let's understand the layout of the homepage.
              <img src={homepageBlank} alt="blank homepage" />
              The grid-area is the <code>workspace</code> and the{" "}
              <code>sidebar</code> is on the right.
              <ol>
                <li>
                  Dark mode and light mode toggle. <code>default - dark</code>
                </li>
                <li>
                  Snap to grid toggle. Removes the grid layout and disables
                  snap-to-grid. Disable the grid for free-drag-movement.
                  <code>default - grid-on</code>
                </li>
                <li>
                  Refresh the page. Removes all the placed elements and starts
                  afresh.
                </li>
                <li>Link to visit the documentation.</li>
                <li>
                  <code>Elements</code> list to pick from. You can pick elements
                  from here and place them into the work-space.
                </li>
                <li>
                  Trash area. Drag an element into this area to delete it from
                  the workspace.
                </li>
              </ol>
            </p>
          </li>
          <li>
            <p>
              When we drag the label element from the sidebar, and drop it onto
              our workspace, the label element takes its shape. You can click on
              the label to open a modal through which you can manipulate the
              styling of the label.
              <img src={labelModal} alt="label-modal" />
              <ol>
                <li>Label name, can be any text string.</li>
                <li>
                  Position of the element on the x-axis.{" "}
                  <code>with X limit</code>
                </li>
                <li>
                  Position of the element on the y-axis.{" "}
                  <code>with Y limit</code>
                </li>
                <li>Font size in pixels.</li>
                <li>
                  Font weight <code>in multiples of 100 (upto 900)</code>
                </li>
                <li>Color selector. Will change the text color.</li>
                <li>Save the changes and close the modal.</li>
                <li>Close the modal without saving changes.</li>
                <li>Label ID</li>
                <li>
                  Actual label in the workspace. will update in real-time.
                </li>
              </ol>
            </p>
          </li>
          <li></li>
          <li></li>
        </ul>
      </section>
      <section className="documentation-page__future"></section>
      <section className="documentation-page__known-bugs"></section>
    </div>
  );
}

export default Documentation;
