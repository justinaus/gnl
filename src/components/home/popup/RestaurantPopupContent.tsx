import LikeDislike from '@components/shared/LikeDislike';
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
      <Typography
        variant="h6"
        sx={{
          fontWeight: 'bold',
        }}
      >
        {data.name}
      </Typography>
    </Stack>
  );
}

function Point({ data }: { data: Restaurant }) {
  const hasPoint = useMemo(() => {
    return data.point !== undefined;
  }, [data.point]);

  return (
    <Typography
      variant="h6"
      color={(theme) =>
        hasPoint ? theme.palette.primary.main : theme.palette.grey[400]
      }
      sx={{
        fontWeight: hasPoint ? 'bold' : undefined,
      }}
    >
      {hasPoint && data.point ? data.point.toFixed(1) : '안가봄'}
    </Typography>
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

  const hashtags = useMemo(() => {
    if (!data.hashtags || data.hashtags.length === 0) return null;
    return data.hashtags.map((hashtag) => `#${hashtag}`).join(' ');
  }, [data.hashtags]);

  return (
    <Stack spacing={2}>
      <Title data={data} />
      <Stack spacing={2}>
        <Stack
          direction={'row'}
          sx={{
            justifyContent: 'space-between',
          }}
        >
          <LikeDislike id={data.id} />
          <Point data={data} />
        </Stack>
        <Typography variant="body1">{content}</Typography>
        {hashtags && (
          <Typography
            variant="body1"
            sx={{
              color: '#546e7a',
            }}
          >
            {hashtags}
          </Typography>
        )}
      </Stack>
    </Stack>
  );
}
