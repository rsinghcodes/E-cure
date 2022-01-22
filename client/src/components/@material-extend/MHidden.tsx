import React, { ReactElement } from "react";
// material
import { useMediaQuery } from "@mui/material";

// ----------------------------------------------------------------------

interface MHiddenPropsTypes {
  children: React.ReactNode;
  width:
    | "xsDown"
    | "smDown"
    | "mdDown"
    | "lgDown"
    | "xlDown"
    | "xsUp"
    | "smUp"
    | "mdUp"
    | "lgUp"
    | "xlUp";
}

const MHidden: React.FC<MHiddenPropsTypes> = ({ width, children }) => {
  const breakpoint = width.substring(0, 2);

  const hiddenUp = useMediaQuery((theme) => theme.breakpoints.up(breakpoint));
  const hiddenDown = useMediaQuery((theme) =>
    theme.breakpoints.down(breakpoint)
  );

  if (width.includes("Down")) {
    return hiddenDown ? null : (children as ReactElement<any>);
  }

  if (width.includes("Up")) {
    return hiddenUp ? null : (children as ReactElement<any>);
  }

  return null;
};

export default MHidden;
