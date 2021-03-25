import React, { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";
import { Draggable } from "gsap/Draggable";
import styled from "styled-components";
import Modal, { ModalProvider, BaseModalBackground } from "styled-react-modal";
import dots from "../assets/draggable-dots.svg";
// import { BlockPicker } from "react-color";
gsap.registerPlugin(Draggable);
const FadingBackground = styled(BaseModalBackground)`
  opacity: ${(props) => props.opacity};
  transition: all 0.3s ease-in-out;
  position: fixed !important;
  top: 0px !important;
  left: 0px !important;
  width: 100vw !important;
  z-index: 100;
`;

const StyledModal = Modal.styled`
  width: 35rem;
  height: 55rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: white;
  opacity: ${(props) => props.opacity};
  transition : all 0.3s ease-in-out;
  box-shadow:0px 0px 10px rgba(0,0,0,0.6);
  border-radius:10px;
  padding:20px 20px;
  z-index: 100;
  `;

function DraggableLabel(props) {
  // ! Ref for the draggable div
  const dragRef = useRef(null);
  const labelRef = useRef(null);
  // ! State to change the bounds
  const [bound, setBound] = useState("body");
  // ! State to update the content
  const [content, setContent] = useState("Label name");
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
  const [labelClass, setLabelClass] = useState("drag drag-label");
  const [borderClass, setBorderClass] = useState("no-border");
  // ! State to manage the font size/weight
  const [fz, setFz] = useState("18px");
  const [fw, setFw] = useState("400");
  useEffect(() => {
    const elementPos = dragRef.current.getBoundingClientRect();
    console.log("for label", elementPos);
    Draggable.create(dragRef.current, {
      onDragEnd: async () => {
        await setBound(props.boundRef.current);
        console.log("elementPos");
      },
      bounds: bound,
    });
    // ! Getting the element's position in the dom

    setLeft(elementPos.left);
    setTop(elementPos.top);
    setDrag({ x: elementPos.width, y: elementPos.height });
  }, []);
  // ! effect for bound change
  useEffect(() => {
    // console.log(elementPos);
    Draggable.create(dragRef.current, {
      onDragEnd: function (ev) {
        setBound(props.boundRef.current);
        setLabelClass("drag drag-label--dropped");
        const elementPos = dragRef.current.getBoundingClientRect();
        setElementPosition({ x: elementPos.x, y: elementPos.y });
        setPosition({
          x: Math.round(elementPosition.x),
          y: Math.round(elementPosition.y),
        });
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
  }, [bound, props.grid]);

  useEffect(() => {
    if (!props.grid) {
      Draggable.create(dragRef.current, {
        liveSnap: false,
        onDragEnd: function (ev) {
          setBound(props.boundRef.current);
          setLabelClass("drag drag-label--dropped");
          const elementPos = dragRef.current.getBoundingClientRect();
          setElementPosition({ x: elementPos.x, y: elementPos.y });
          setPosition({
            x: Math.round(elementPosition.x),
            y: Math.round(elementPosition.y),
          });
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
    labelRef.current.style.fontSize = fz;
    labelRef.current.style.fontWeight = fw;
    toggleModal();
  }
  return (
    <div>
      <div className={labelClass} ref={dragRef} onClick={toggleModal}>
        <img src={dots} alt="" />
        <h2 className={borderClass} ref={labelRef}>
          {content}
        </h2>
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
                  placeholder="Label name"
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
                        ? (labelRef.current.style.color = "#042a2b")
                        : (labelRef.current.style.color = "#fff");
                    }}
                  />
                  <input
                    type="radio"
                    name="bg"
                    onChange={(ev) => {
                      ev.target.checked
                        ? (labelRef.current.style.color = "#ef7b45")
                        : (labelRef.current.style.color = "#fff");
                    }}
                  />
                  <input
                    type="radio"
                    name="bg"
                    onChange={(ev) => {
                      ev.target.checked
                        ? (labelRef.current.style.color = "#cbef43")
                        : (labelRef.current.style.color = "#fff");
                    }}
                  />
                  <input
                    type="radio"
                    name="bg"
                    onChange={(ev) => {
                      ev.target.checked
                        ? (labelRef.current.style.color = "#c45baa")
                        : (labelRef.current.style.color = "#fff");
                    }}
                  />
                  <input
                    type="radio"
                    name="bg"
                    onChange={(ev) => {
                      ev.target.checked
                        ? (labelRef.current.style.color = "#6c464f")
                        : (labelRef.current.style.color = "#fff");
                    }}
                  />
                  <input
                    type="radio"
                    name="bg"
                    onChange={(ev) => {
                      ev.target.checked
                        ? (labelRef.current.style.color = "#fff")
                        : (labelRef.current.style.color = "#fff");
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

export default DraggableLabel;
