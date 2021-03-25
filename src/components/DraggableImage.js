import React, { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";
import { Draggable } from "gsap/Draggable";
import styled from "styled-components";
import Modal, { ModalProvider, BaseModalBackground } from "styled-react-modal";
import dots from "../assets/draggable-dots.svg";
import dummyImage from "../assets/dummy.PNG";
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
  `;

function DraggableImage(props) {
  // ! Ref for the draggable div
  const dragRef = useRef(null);
  const imageRef = useRef(null);
  const checkboxRef = useRef(null);
  // ! State to change the bounds
  const [bound, setBound] = useState("body");
  // ! State to update the content
  const [content, setContent] = useState("Image upload");
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
  const [imageClass, setImageClass] = useState("drag drag-image");
  const [borderClass, setBorderClass] = useState("no-border");
  // ! State to manage the font height/width
  const [ht, setHt] = useState("100px");
  const [wd, setWd] = useState("200px");
  const [htChange, setHtChange] = useState(false);
  const [wdChange, setWdChange] = useState(false);
  const [aspect, setAspect] = useState(false);
  const [ratio, setRatio] = useState(2);
  // ! initial render shift for textlabel
  const [firstSet, setFirstSet] = useState(true);
  // ! Show/hide inputbox
  const [showInput, setShowInput] = useState(false);
  // ! handle the uploaded file
  const [file, setFile] = useState(null);
  const shiftTag = () => {
    gsap.to(dragRef.current, { y: "+=210", duration: 0 });
  };
  useEffect(() => {
    const elementPos = dragRef.current.getBoundingClientRect();
    Draggable.create(dragRef.current, {
      onDragEnd: async () => {
        await setBound(props.boundRef.current);
        console.log("elementPos");
      },
      bounds: bound,
    });
    // ! Getting the element's position in the dom

    setLeft(elementPos.left);
    setTop(elementPos.top - 210);
    setDrag({ x: elementPos.width, y: elementPos.height - 210 });
    setFile(dummyImage);
  }, []);
  // ! effect for bound change
  useEffect(() => {
    // console.log(elementPos);
    Draggable.create(dragRef.current, {
      onDragEnd: function () {
        setBound(props.boundRef.current);
        setImageClass("drag drag-image--dropped");
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
          setImageClass("drag drag-image--dropped");
          const elementPos = dragRef.current.getBoundingClientRect();
          setElementPosition({ x: elementPos.x, y: elementPos.y });
          setPosition({
            x: Math.round(elementPosition.x),
            y: Math.round(elementPosition.y),
          });
          setShowInput(true);
          if (firstSet) {
            console.log(firstSet);
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
  function modalSubmit(param = "no") {
    if (position.x !== 0 && position.y !== 0) {
      gsap.to(dragRef.current, {
        x: elementPosition.x - left,
        y: elementPosition.y - top,
      });
    }
    if (param === "htwd") {
      imageRef.current.style.height = ht;
      imageRef.current.style.width = wd;
    }
    if (param === "ht") imageRef.current.style.height = ht;
    if (param === "wd") imageRef.current.style.width = wd;
    toggleModal();
  }
  return (
    <div>
      <div className={imageClass} ref={dragRef} onClick={toggleModal}>
        <img src={dots} alt="" className="drag-dots" />
        {!showInput ? <h2 className={borderClass}>{content}</h2> : null}
        {/* <img src={dummyImage} alt="" className="content-image" /> */}
        {showInput ? (
          <img src={file} ref={imageRef} alt="" className="content-image" />
        ) : null}
        {/* <input
            type="file"
            placeholder="input text here"
            className={borderClass}
            ref={imageRef}
            accept="image/*"
            onChange={(ev) => {
              //   setFile(ev.target.files[0]);
              //   console.log(ev.target.files[0]);
              const reader = new FileReader();
              reader.onload = () => {
                if (reader.readyState === 2) {
                  setFile(reader.result);
                }
              };
              reader.readAsDataURL(ev.target.files[0]);
            }}
          /> */}
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
              <h1>Image label ID - {props.index}</h1>
              <div className="configuration-modal">
                <input
                  type="text"
                  placeholder="Image title"
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
                    Height
                    <input
                      type="text"
                      placeholder="height"
                      disabled={checkboxRef?.current?.checked}
                      value={ht.replace("px", "")}
                      onChange={(ev) => {
                        setHt(`${ev.target.value}px`);
                        setHtChange(true);
                      }}
                      onKeyDown={(ev) => {
                        if (ev.key === "Enter") modalSubmit("ht");
                      }}
                    />
                  </label>
                  <label htmlFor="">
                    Width
                    <input
                      type="text"
                      placeholder="width"
                      value={wd.replace("px", "")}
                      onChange={(ev) => {
                        setWd(`${ev.target.value}px`);
                        setWdChange(true);
                        if (aspect) {
                          console.log(aspect, ratio);
                          setHt(`${ev.target.value / ratio}px`);
                          setHtChange(true);
                        }
                      }}
                      onKeyDown={(ev) => {
                        if (ev.key === "Enter") {
                          if (aspect) {
                            modalSubmit("htwd");
                          }
                          modalSubmit("wd");
                        }
                      }}
                    />
                  </label>
                  <label class="aspect-ratio-checkbox">
                    Preserve aspect ratio
                    <input
                      ref={checkboxRef}
                      type="checkbox"
                      onChange={() => {
                        if (checkboxRef.current.checked) {
                          setAspect(true);
                        } else {
                          setAspect(false);
                        }
                      }}
                    />
                  </label>
                </div>
              </div>
              <input
                type="file"
                className="file-upload"
                onChange={(ev) => {
                  setFile(URL.createObjectURL(ev.target.files[0]));
                  var img = new Image();

                  img.onload = function () {
                    var height = img.height;
                    var width = img.width;
                    console.log(height, width);
                    setRatio(width / height);
                  };
                  img.src = URL.createObjectURL(ev.target.files[0]);
                }}
              />
              <div className="configuration-modal__btn-group">
                <button
                  onClick={() => {
                    if (htChange && wdChange) {
                      modalSubmit("htwd");
                      setHtChange(false);
                      setWdChange(false);
                    } else if (htChange) {
                      modalSubmit("ht");
                      setHtChange(false);
                    } else if (wdChange) {
                      modalSubmit("wd");
                      setWdChange(false);
                    } else {
                      modalSubmit();
                    }
                  }}
                >
                  Save changes
                </button>
                <button onClick={toggleModal}>Close</button>
              </div>
            </div>
          </StyledModal>
        </div>
      </ModalProvider>
    </div>
  );
}

export default DraggableImage;
