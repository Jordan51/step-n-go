import React from "react";

import { TransportType } from "../../types/Transport";

import { Typography, Box } from "@material-ui/core";
import ArrowRight from "@material-ui/icons/ArrowRightAlt";

const Flight: React.FC<{ flight: TransportType }> = ({ flight }) => {
  return (
    <>
      <Box display="flex">
        <Typography>{flight.depLocation}</Typography>
        <ArrowRight style={{ margin: "0 8px" }} />
        <Typography>{flight.arrLocation}</Typography>
      </Box>
      <Typography>Info B</Typography>
      <Typography>Info C</Typography>
    </>
  );
};

export default Flight;
