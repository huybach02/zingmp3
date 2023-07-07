import React from "react";

const Button = ({text, style, icon}) => {
  return (
    <button
      type="button"
      className={`${style ? style : "py-1 px-4 rounded-lg"}`}
    >
      {text && <span>{text}</span>}
      {icon && <span>{icon}</span>}
    </button>
  );
};

export default Button;
