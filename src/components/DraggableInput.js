import React, { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";
import { Draggable } from "gsap/Draggable";
gsap.registerPlugin(Draggable);
function DraggableInput() {
  const dragRef = useRef(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [left, setLeft] = useState(0);
  const [top, setTop] = useState(0);
  useEffect(() => {
    Draggable.create(dragRef.current);

    const elementPos = dragRef.current.getBoundingClientRect();
    // console.log(elementPos);
    setLeft(elementPos.left);
    setTop(elementPos.top);
  }, []);
  return (
    <div>
      <div className="drag drag-input" ref={dragRef}></div>
      {/* <button
        onClick={() => {
          gsap.to(dragRef.current, { x: 200 - left, y: 400 - top });
        }}
      >
        set xy
      </button> */}
    </div>
  );
}

export default DraggableInput;
