import React from "react";

const Button = props => {
  return (
    <div className="button">
      <button onClick={props.handleChange}>{props.children}</button>
    </div>
  );
};

export default Button;
