import React, { ReactElement } from "react";
// material
import { Theme, useMediaQuery } from "@mui/material";

// ----------------------------------------------------------------------

interface MHiddenPropsTypes {
  children: React.ReactNode;
  width: "Down" | "Up";
  breakpoint: "xs" | "sm" | "md" | "lg" | "xl";
}

const MHidden: React.FC<MHiddenPropsTypes> = ({
  width,
  breakpoint,
  children,
}) => {
  const hiddenUp = useMediaQuery((theme: Theme) =>
    theme.breakpoints.up(breakpoint)
  );
  const hiddenDown = useMediaQuery((theme: Theme) =>
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
