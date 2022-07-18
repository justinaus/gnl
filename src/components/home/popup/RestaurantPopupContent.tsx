import { Stack, Typography } from '@mui/material';
import { Restaurant } from '@pages/api/restaurants';
import React from 'react';
import { useMemo } from 'react';

interface Props {
  data: Restaurant;
}

function Title({ data }: { data: Restaurant }) {
  return (
    <Stack
      direction={'row'}
      sx={{
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <Typography variant="h6">{data.name}</Typography>
    </Stack>
  );
}

export default function RestaurantPopupContent({ data }: Props) {
  const content = useMemo(() => {
    if (!data.content) return null;

    return data.content.split('\n').map((text, index) => {
      return (
        <React.Fragment key={index}>
          {text}
          <br />
        </React.Fragment>
      );
    });
  }, [data.content]);

  return (
    <Stack spacing={2}>
      <Title data={data} />
      <Stack spacing={2}>
        <Typography variant="body1">{content}</Typography>
      </Stack>
    </Stack>
  );
}
