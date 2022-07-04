import { Container } from '@mui/material';
import React from 'react';

import { APP_MAX_WIDTH } from '../../constants';

type Props = {};

export default function AppLayout({
  children,
}: React.PropsWithChildren<Props>) {
  return (
    <Container
      sx={{
        maxWidth: `${APP_MAX_WIDTH}px !important`,
        overflow: 'hidden',
        minHeight: '100vh',
        paddingLeft: '0 !important',
        paddingRight: '0 !important',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: '0px 0px 16px rgb(50 50 50 / 12%)',
      }}
    >
      {children}
    </Container>
  );
}
