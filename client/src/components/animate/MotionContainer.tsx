import { motion } from "framer-motion";
// material
import { Box } from "@mui/material";
//
import { varWrapEnter } from "./variants";

// ----------------------------------------------------------------------

interface MotionContainerPropsTypes {
  open: boolean;
  children: React.ReactNode;
  initial?: string;
}

export default function MotionContainer({
  open,
  children,
  ...other
}: MotionContainerPropsTypes) {
  return (
    <Box
      component={motion.div}
      initial={false}
      animate={open ? "animate" : "exit"}
      variants={varWrapEnter}
      {...other}
    >
      {children}
    </Box>
  );
}
