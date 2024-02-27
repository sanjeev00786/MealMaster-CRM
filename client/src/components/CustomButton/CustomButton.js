import React from "react";
import CustomButtonLoader from "./CustomButtonLoader";

export default function CustomButton({ isLoading, children, ...props }) {
  return (
    <button className="button" {...props}>
      <div>{isLoading ? <CustomButtonLoader /> : children}</div>
    </button>
  );
}