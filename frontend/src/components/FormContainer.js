import React from "react";

const FormContainer = ({ children, width = "xl" }) => {
  return React.createElement(
    "div",
    {
      className: `
        flex flex-col
        shadow-md
        rounded-md
        bg-white
        p-10
        max-w-${width}
      `,
    },
    children
  );
};

export default FormContainer;
