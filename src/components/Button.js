import React from "react";

const Button = ({text, style}) => {
  return (
    <button
      type="button"
      className={`${style ? style : "py-1 px-4 rounded-lg"}`}
    >
      {text}
    </button>
  );
};

export default Button;
