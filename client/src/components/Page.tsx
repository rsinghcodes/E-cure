import { Helmet } from "react-helmet-async";
import { forwardRef } from "react";
// material
import { Box } from "@mui/material";

// ----------------------------------------------------------------------

interface PagePropTypes {
  children: React.ReactNode;
  title: string;
}

const Page = forwardRef(
  ({ children, title = "", ...other }: PagePropTypes, ref) => (
    <Box ref={ref} {...other}>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      {children}
    </Box>
  )
);

export default Page;
