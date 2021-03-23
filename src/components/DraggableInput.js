import React, { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";
import { Draggable } from "gsap/Draggable";
gsap.registerPlugin(Draggable);
function DraggableInput() {
  const dragRef = useRef(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  useEffect(() => {
    Draggable.create(dragRef.current);
  }, []);
  return (
    <div>
      <div className="drag drag-input" ref={dragRef}></div>
      {/* <button
        onClick={() => {
          gsap.to(dragRef.current, { x: 200, y: 400 });
        }}
      >
        set xy
      </button> */}
    </div>
  );
}

export default DraggableInput;
