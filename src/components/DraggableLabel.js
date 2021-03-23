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
  const dragRef = useRef(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [showModal, setShowModal] = useState(false);
  useEffect(() => {
    Draggable.create(dragRef.current, {
      onDragEnd: () => console.log("dropped"),
    });
  }, []);
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
        <h2>Manas</h2>
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
                <input type="text" placeholder="Content" />
                <div className="configuration-modal__position">
                  <input type="text" placeholder="Position - X" />
                  <input type="text" placeholder="Position - Y" />
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
            </div>
            <button onClick={toggleModal}>Close me</button>
          </StyledModal>
        </div>
      </ModalProvider>
    </div>
  );
}

export default DraggableLabel;
