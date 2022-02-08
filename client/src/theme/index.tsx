import React, { useMemo } from 'react';
// material
import { CssBaseline } from '@mui/material';
import {
  ThemeProvider,
  createTheme,
  StyledEngineProvider,
} from '@mui/material/styles';

import palette from './palette';
import typography from './typography';

// ----------------------------------------------------------------------

interface ThemeConfigPropTypes {
  children: React.ReactNode;
}

export default function ThemeConfig({ children }: ThemeConfigPropTypes) {
  const themeOptions = useMemo(
    () => ({
      palette,
      typography,
    }),
    []
  );

  const theme = createTheme(themeOptions);

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </StyledEngineProvider>
  );
}
