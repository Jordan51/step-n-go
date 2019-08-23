import React from "react";

import { Typography } from "@material-ui/core";
import { TransportType } from "../AddTravel/TravelTransportForm";

const Flight: React.FC<{ flight: TransportType }> = ({ flight }) => {
  return (
    <>
      <Typography>{flight.depLocation}</Typography>
      <Typography>{flight.arrLocation}</Typography>
      <Typography>Info B</Typography>
      <Typography>Info C</Typography>
    </>
  );
};

export default Flight;
