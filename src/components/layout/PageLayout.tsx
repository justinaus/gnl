import { Box } from '@mui/material';
import React from 'react';

import ErrorBoundary from '../shared/ErrorBoundary';

type Props = {};

export default function PageLayout({
  children,
}: React.PropsWithChildren<Props>) {
  return (
    <Box
      component="main"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
      }}
    >
      <ErrorBoundary>{children}</ErrorBoundary>
    </Box>
  );
}
