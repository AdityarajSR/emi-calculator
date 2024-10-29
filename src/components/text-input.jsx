import React from "react";

const TextInput = ({title, state, setState}) => {
  return (
    <React.Fragment>
      <span className="localTitle">{title}</span>
      <input
        type="number"
        value={state}
        onChange={(e) => setState(e.target.value)}
        placeholder={title}
      />
    </React.Fragment>

    // <span className="localTitle">TOTAL COST OF ASSET</span>
    //   <input
    //     type="number"
    //     value={cost}
    //     onChange={(e) => setCost(e.target.value)}
    //     placeholder="Total cost of assests"
    //   />
  );
};

export default TextInput;
