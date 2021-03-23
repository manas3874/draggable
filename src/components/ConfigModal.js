import React, { useState } from "react";
import ReactDOM from "react-dom";

import Modal, { ModalProvider, BaseModalBackground } from "styled-react-modal";

const StyledModal = Modal.styled`
  width: 20rem;
  height: 20rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: white;
  opacity: ${(props) => props.opacity};
  transition : all 0.3s ease-in-out;`;

function ConfigModal() {
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
      <button onClick={toggleModal}>Open modal</button>
      <StyledModal
        isOpen={isOpen}
        afterOpen={afterOpen}
        beforeClose={beforeClose}
        onBackgroundClick={toggleModal}
        onEscapeKeydown={toggleModal}
        opacity={opacity}
        backgroundProps={{ opacity }}
      >
        <span>I am a modal!</span>
        <button onClick={toggleModal}>Close me</button>
      </StyledModal>
    </div>
  );
  //   return (
    //   <div className="configuration-modal-wrapper">
    //     <div className="configuration-modal">
    //       <input type="text" placeholder="Content" />
    //       <div className="configuration-modal__position">
    //         <input type="text" placeholder="Position - X" />
    //         <input type="text" placeholder="Position - Y" />
    //       </div>
    //       <div className="configuration-modal__styling">
    //         <input type="text" placeholder="Font size" />
    //         <input type="text" placeholder="Font weight" />
    //       </div>
    //       <div className="configuration-modal__bg">
    //         <input type="radio" name="bg" />
    //         <input type="radio" name="bg" />
    //         <input type="radio" name="bg" />
    //         <input type="radio" name="bg" />
    //         <input type="radio" name="bg" />
    //         <input type="radio" name="bg" />
    //       </div>
    //     </div>
    //   </div>
  //   );
}

export default ConfigModal;
