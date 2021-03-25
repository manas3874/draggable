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
  position: fixed;
  top: 0px;
  left: 0px;
  width: 100vw;
`;

const StyledModal = Modal.styled`
  width: 35rem;
  height: 50rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: white;
  opacity: ${(props) => props.opacity};
  transition : all 0.3s ease-in-out;
  box-shadow:0px 0px 10px rgba(0,0,0,0.6);
  border-radius:10px;
  padding:20px 20px;
  `;

function DraggableButton(props) {
  // ! Ref for the draggable div
  const dragRef = useRef(null);
  const buttonRef = useRef(null);
  // ! State to change the bounds
  const [bound, setBound] = useState("body");
  // ! State to update the content
  const [content, setContent] = useState("Button text");
  // ! State to manage the positions
  const [position, setPosition] = useState({ x: 0, y: 0 });
  // ! State to manage the element's left and top position
  const [left, setLeft] = useState(0);
  const [top, setTop] = useState(0);
  // ! element's current position, to live update in the modal
  const [elementPosition, setElementPosition] = useState({ x: 0, y: 0 });
  // ! state for dimensions of the drag component
  const [drag, setDrag] = useState({ x: 0, y: 0 });
  // ! Classname setting for dropping
  const [buttonClass, setButtonClass] = useState("drag drag-button");
  const [borderClass, setBorderClass] = useState("no-border");
  // ! State to manage the font size/weight
  const [fz, setFz] = useState("18px");
  const [fw, setFw] = useState("400");
  // ! initial render shift for textlabel
  const [firstSet, setFirstSet] = useState(true);
  // ! Show/hide inputbox
  const [showInput, setShowInput] = useState(false);
  const shiftTag = () => {
    gsap.to(dragRef.current, { y: "+=140", duration: 0 });
  };
  useEffect(() => {
    const elementPos = dragRef.current.getBoundingClientRect();
    // console.log("for button", elementPos);
    Draggable.create(dragRef.current, {
      onDragEnd: async () => {
        await setBound(props.boundRef.current);
        console.log("elementPos");
      },
      bounds: bound,
    });
    // ! Getting the element's position in the dom

    setLeft(elementPos.left);
    setTop(elementPos.top - 140);
    setDrag({ x: elementPos.width, y: elementPos.height - 140 });
  }, []);
  // ! effect for bound change
  useEffect(() => {
    Draggable.create(dragRef.current, {
      onDragEnd: function () {
        setBound(props.boundRef.current);
        setButtonClass("drag drag-button--dropped");
        const elementPos = dragRef.current.getBoundingClientRect();
        setElementPosition({ x: elementPos.x, y: elementPos.y });
        setPosition({
          x: Math.round(elementPosition.x),
          y: Math.round(elementPosition.y),
        });
        setShowInput(true);
        if (firstSet) {
          setFirstSet(false);
          shiftTag();
        }
        if (this.hitTest(props.bin.current, "30%")) {
          dragRef.current.style.display = "none";
        }
      },
      onPress: () => {
        setBorderClass("red-border");
      },
      onRelease: () => {
        setBorderClass("no-border");
      },
      bounds: bound,
      type: "x,y",
      liveSnap: {
        // ! snaps to the closest increment of 10 by default.
        x: function (value) {
          return Math.round(value / 10) * 10;
        },
        y: function (value) {
          return Math.round(value / 10) * 10;
        },
      },
    });
  }, [bound, firstSet, props.grid]);
  useEffect(() => {
    if (!props.grid) {
      Draggable.create(dragRef.current, {
        liveSnap: false,
        onDragEnd: function () {
          setBound(props.boundRef.current);
          setButtonClass("drag drag-button--dropped");
          const elementPos = dragRef.current.getBoundingClientRect();
          setElementPosition({ x: elementPos.x, y: elementPos.y });
          setPosition({
            x: Math.round(elementPosition.x),
            y: Math.round(elementPosition.y),
          });
          setShowInput(true);
          if (firstSet) {
            setFirstSet(false);
            shiftTag();
          }
          if (this.hitTest(props.bin.current, "30%")) {
            dragRef.current.style.display = "none";
          }
        },
      });
    }
  }, [props.grid]);
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
  function modalSubmit() {
    if (position.x !== 0 && position.y !== 0) {
      gsap.to(dragRef.current, {
        x: position.x - left,
        y: position.y - top,
      });
    }
    buttonRef.current.style.fontSize = fz;
    buttonRef.current.style.fontWeight = fw;
    toggleModal();
  }
  return (
    <div>
      <div className={buttonClass} ref={dragRef} onClick={toggleModal}>
        <img src={dots} alt="" />
        {!showInput ? <h2 className={borderClass}>{content}</h2> : null}
        {showInput ? (
          <button
            type="text"
            placeholder="input text here"
            className="btn"
            ref={buttonRef}
          >
            {content}
          </button>
        ) : null}
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
              <h1>Label ID - {props.index}</h1>
              <div className="configuration-modal">
                <input
                  type="text"
                  placeholder="Button name"
                  onChange={(ev) => setContent(ev.target.value)}
                />
                <div className="configuration-modal__position">
                  <label htmlFor="">
                    Limit (x) - {Math.round(props.bounds.x - drag.x)}
                    <input
                      type="text"
                      placeholder={Math.round(elementPosition.x)}
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
                    Limit (y) - {Math.round(props.bounds.y - drag.y)}
                    <input
                      type="text"
                      placeholder={Math.round(elementPosition.y)}
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
                  <label htmlFor="">
                    Font size
                    <input
                      type="text"
                      placeholder="Font size"
                      value={fz.replace("px", "")}
                      onChange={(ev) => {
                        setFz(`${ev.target.value}px`);
                      }}
                      onKeyDown={(ev) => {
                        if (ev.key === "Enter") modalSubmit();
                      }}
                    />
                  </label>
                  <label htmlFor="">
                    Font weight
                    <input
                      type="text"
                      placeholder="Font weight"
                      value={fw.replace("px", "")}
                      onChange={(ev) => {
                        setFw(ev.target.value);
                      }}
                      onKeyDown={(ev) => {
                        if (ev.key === "Enter") modalSubmit();
                      }}
                    />
                  </label>
                </div>
                <div className="configuration-modal__bg">
                  <input
                    type="radio"
                    name="bg"
                    onChange={(ev) => {
                      ev.target.checked
                        ? (buttonRef.current.style.backgroundColor = "#042a2b")
                        : (buttonRef.current.style.backgroundColor = "#fff");
                    }}
                  />
                  <input
                    type="radio"
                    name="bg"
                    onChange={(ev) => {
                      ev.target.checked
                        ? (buttonRef.current.style.backgroundColor = "#ef7b45")
                        : (buttonRef.current.style.backgroundColor = "#fff");
                    }}
                  />
                  <input
                    type="radio"
                    name="bg"
                    onChange={(ev) => {
                      ev.target.checked
                        ? (buttonRef.current.style.backgroundColor = "#cbef43")
                        : (buttonRef.current.style.backgroundColor = "#fff");
                    }}
                  />
                  <input
                    type="radio"
                    name="bg"
                    onChange={(ev) => {
                      ev.target.checked
                        ? (buttonRef.current.style.backgroundColor = "#c45baa")
                        : (buttonRef.current.style.backgroundColor = "#fff");
                    }}
                  />
                  <input
                    type="radio"
                    name="bg"
                    onChange={(ev) => {
                      ev.target.checked
                        ? (buttonRef.current.style.backgroundColor = "#6c464f")
                        : (buttonRef.current.style.backgroundColor = "#fff");
                    }}
                  />
                  <input
                    type="radio"
                    name="bg"
                    onChange={(ev) => {
                      ev.target.checked
                        ? (buttonRef.current.style.backgroundColor = "#fff")
                        : (buttonRef.current.style.backgroundColor = "#fff");
                    }}
                  />
                </div>
              </div>
              <div className="configuration-modal__btn-group">
                <button onClick={modalSubmit}>Save changes</button>
                <button onClick={toggleModal}>Close</button>
              </div>
            </div>
          </StyledModal>
        </div>
      </ModalProvider>
    </div>
  );
}

export default DraggableButton;
