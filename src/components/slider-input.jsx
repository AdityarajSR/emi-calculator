import React from "react";

const SliderInput = ({
  title,
  state,
  mini,
  maxi,
  onChange,
  labelMin,
  labelMax,
  fee,
}) => {
  return (
    <div className="sliderContainer">
      <span className="localTitle">{title}</span>
      <span className="localTitle highlighted">
        Total {title} - {(Number(state) + (maxi - state) * (fee / 100)).toFixed(0)}
      </span>

      <input
        className="slider"
        type="range"
        value={state}
        min={mini}
        max={maxi}
        onChange={onChange}
      />
      <div className="labels">
        <label>{labelMin ?? mini}</label>
        <b>{state}</b>
        <label>{labelMax ?? maxi}</label>
      </div>
    </div>
  );
};

export default SliderInput;
