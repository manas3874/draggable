import React, { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";
import { Draggable } from "gsap/Draggable";
import styled from "styled-components";
import Modal, { ModalProvider, BaseModalBackground } from "styled-react-modal";
import dots from "../assets/draggable-dots.svg";
gsap.registerPlugin(Draggable);
const FadingBackground = styled(BaseModalBackground)`
  opacity: ${(props) => props.opacity};
  transition: all 0.3s ease-in-out;
`;

const StyledModal = Modal.styled`
  width: 20rem;
  height: 20rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: white;
  opacity: ${(props) => props.opacity};
  transition : all 0.3s ease-in-out;`;

function DraggableLabel(props) {
  // ! Ref for the draggable div
  const dragRef = useRef(null);
  // ! State to change the bounds
  const [bound, setBound] = useState("body");
  // ! State to update the content
  const [content, setContent] = useState("Label name");
  // ! State to manage the positions
  const [position, setPosition] = useState({ x: 0, y: 0 });
  // ! State to manage the element's left and top position
  const [left, setLeft] = useState(0);
  const [top, setTop] = useState(0);
  // ! state for dimensions of the drag component
  const [drag, setDrag] = useState({ x: 0, y: 0 });
  useEffect(() => {
    Draggable.create(dragRef.current, {
      onDragEnd: async () => {
        await setBound(props.boundRef.current);
      },
      bounds: bound,
    });
    // ! Getting the element's position in the dom
    const elementPos = dragRef.current.getBoundingClientRect();
    // console.log(elementPos);
    setLeft(elementPos.left);
    setTop(elementPos.top);
    setDrag({ x: elementPos.width, y: elementPos.height });
  }, []);
  // ! effect for bound change
  useEffect(() => {
    Draggable.create(dragRef.current, {
      onDragEnd: async () => {
        await setBound(props.boundRef.current);
      },
      bounds: bound,
    });
  }, [bound]);
  // ! for modal
  const [isOpen, setIsOpen] = useState(false);
  const [opacity, setOpacity] = useState(0);

  function toggleModal(e) {
    setOpacity(0);
    setIsOpen(!isOpen);
  }

  function afterOpen() {
    setTimeout(() => {
      setOpacity(1);
    }, 100);
  }

  function beforeClose() {
    return new Promise((resolve) => {
      setOpacity(0);
      setTimeout(resolve, 300);
    });
  }
  return (
    <div>
      <div className="drag drag-label" ref={dragRef} onClick={toggleModal}>
        <img src={dots} alt="" />
        <h2>{content}</h2>
      </div>
      <ModalProvider backgroundComponent={FadingBackground}>
        <div>
          <StyledModal
            isOpen={isOpen}
            afterOpen={afterOpen}
            beforeClose={beforeClose}
            onBackgroundClick={toggleModal}
            onEscapeKeydown={toggleModal}
            opacity={opacity}
            backgroundProps={{ opacity }}
          >
            <div className="configuration-modal-wrapper">
              <h1>{props.index}</h1>
              <div className="configuration-modal">
                <input
                  type="text"
                  placeholder="Label name"
                  onChange={(ev) => setContent(ev.target.value)}
                />
                <div className="configuration-modal__position">
                  <label htmlFor="">
                    Limit - {Math.round(props.bounds.x - drag.x)}
                    <input
                      type="text"
                      placeholder="Position - X"
                      onChange={(ev) =>
                        setPosition({
                          ...position,
                          x:
                            Number(ev.target.value) <
                            Math.round(props.bounds.x - drag.x)
                              ? Number(ev.target.value)
                              : Math.round(props.bounds.x - drag.x),
                        })
                      }
                    />
                  </label>
                  <label htmlFor="">
                    Limit - {Math.round(props.bounds.y - drag.y)}
                    <input
                      type="text"
                      placeholder="Position - Y"
                      onChange={(ev) =>
                        setPosition({
                          ...position,
                          y:
                            Number(ev.target.value) <
                            Math.round(props.bounds.y - drag.y)
                              ? Number(ev.target.value)
                              : Math.round(props.bounds.y - drag.y),
                        })
                      }
                    />
                  </label>
                </div>
                <div className="configuration-modal__styling">
                  <input type="text" placeholder="Font size" />
                  <input type="text" placeholder="Font weight" />
                </div>
                <div className="configuration-modal__bg">
                  <input type="radio" name="bg" />
                  <input type="radio" name="bg" />
                  <input type="radio" name="bg" />
                  <input type="radio" name="bg" />
                  <input type="radio" name="bg" />
                  <input type="radio" name="bg" />
                </div>
              </div>
              <button
                onClick={() =>
                  gsap.to(dragRef.current, {
                    x: position.x - left,
                    y: position.y - top,
                  })
                }
              >
                Submit
              </button>
              <button onClick={toggleModal}>Close me</button>
            </div>
          </StyledModal>
        </div>
      </ModalProvider>
    </div>
  );
}

export default DraggableLabel;
