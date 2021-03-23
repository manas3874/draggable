import React, { useState, useRef, useEffect } from "react";
import DraggableLabel from "../components/DraggableLabel";
import DraggableInput from "../components/DraggableInput";
import DraggableButton from "../components/DraggableButton";

function Homepage() {
  const workspaceRef = useRef(null);
  const [tagLimit, setTagLimit] = useState(3);
  // ! workspace bounds state
  const [workspace, setWorkspace] = useState({ x: 0, y: 0 });
  // ! Will be changed later
  const setTags = (tag) => {
    var dummyArr = [];
    for (let i = 0; i < tagLimit; i++) {
      dummyArr.push(tag);
    }
    return dummyArr;
  };

  // ! Generating the usable labels
  const setLabels = () => {
    var dummyArr = [];
    for (let i = 0; i < tagLimit; i++) {
      dummyArr.push(
        <DraggableLabel
          index={tagLimit - i}
          boundRef={workspaceRef}
          bounds={workspace}
        />
      );
    }
    return dummyArr;
  };
  useEffect(() => {
    const workspaceBounds = workspaceRef.current.getBoundingClientRect();
    setWorkspace({
      x: workspaceBounds.width,
      y: workspaceBounds.height,
    });
    // console.log(workspaceBounds);
  }, []);
  return (
    <div className="homepage">
      <div className="homepage__workspace" ref={workspaceRef}></div>
      <div className="homepage__sidebar">
        <div className="homepage__sidebar--container">{setLabels()}</div>
        <div className="homepage__sidebar--container">
          {setTags(<DraggableInput />)}
        </div>
        <div className="homepage__sidebar--container">
          {setTags(<DraggableButton />)}
        </div>
      </div>
    </div>
  );
}

export default Homepage;
