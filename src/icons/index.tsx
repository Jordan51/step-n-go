import React from "react";

import SvgIcon, { SvgIconProps } from "@material-ui/core/SvgIcon";

export function TentIcon(props: SvgIconProps) {
  return (
    <SvgIcon {...props}>
      <path d="M 12 3 C 6.90625 15.40625 5.71875 17.835938 4 19 L 2 20 L 2 21 L 4 20 L 4 21 L 9 21 C 9 21 11.597656 18.164063 12 14 C 12.4375 18.179688 15 21 15 21 L 20 21 L 20 20 L 22 21 L 22 20 L 20 19 C 18.28125 17.835938 16.875 15.34375 12 3 Z " />
    </SvgIcon>
  );
}
