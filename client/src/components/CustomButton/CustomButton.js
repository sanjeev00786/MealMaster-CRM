import React from "react";
import "../../pages/CSS/variable.css";

import CustomButtonLoader from "./CustomButtonLoader";

export default function CustomButton({ isLoading, children, ...props }) {
  return (
    <button className="button" {...props}>
      <div>{isLoading ? <CustomButtonLoader /> : children}</div>
    </button>
  );
}