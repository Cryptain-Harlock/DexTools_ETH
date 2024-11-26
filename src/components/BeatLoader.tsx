import React from "react";
import BeatLoader from "react-spinners/BeatLoader";

export const LoadingSpinner = () => {
  return (
    <div className="flex w-full items-center justify-center py-6">
      <BeatLoader color="white" size={15} margin={1.5} />
    </div>
  );
};
