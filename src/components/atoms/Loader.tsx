import React from "react";
import { ClipLoader } from "react-spinners";

export const Loader = ({ isLoading }: { isLoading: boolean }) => {
  return (
    <div className="w-full h-full flex justify-center items-center">
      <ClipLoader
        color="blue"
        loading={isLoading}
        size={150}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );
};
