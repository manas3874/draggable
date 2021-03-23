import React, { useState, useRef, useEffect } from "react";
import DraggableLabel from "../components/DraggableLabel";
import DraggableInput from "../components/DraggableInput";
import DraggableButton from "../components/DraggableButton";

function Homepage() {
  const [tagLimit, setTagLimit] = useState(3);
  const setTags = (tag) => {
    var dummyArr = [];
    for (let i = 0; i < tagLimit; i++) {
      dummyArr.push(tag);
    }
    return dummyArr;
  };

  const setLabels = () => {
    var dummyArr = [];
    for (let i = 0; i < tagLimit; i++) {
      dummyArr.push(<DraggableLabel index={tagLimit - i} />);
    }
    return dummyArr;
  };
  return (
    <div className="homepage">
      <div className="homepage__workspace"></div>
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
