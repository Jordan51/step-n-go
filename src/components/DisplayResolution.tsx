import React from "react";

import Button from "@material-ui/core/Button";

export const DisplayResolution = () => {
  function getResolution() {
    if (window) {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const gridValue =
        width < 600
          ? "xs"
          : width < 1024
          ? "sm"
          : width < 1440
          ? "md"
          : width < 1920
          ? "lg"
          : "xl";
      alert(`Screen Resolution: ${width} x ${height} (${gridValue})`);
    }
  }

  return (
    <Button
      onClick={getResolution}
      style={{ margin: 16, position: "fixed", right: 0, bottom: 0 }}
    >
      Get Resolution
    </Button>
  );
};
