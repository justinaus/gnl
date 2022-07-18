import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import { Stack, Typography } from '@mui/material';

type Props = {
  id: string;
};

export default function LikeDislike({ id }: Props) {
  // TODO like dislike 조회.

  return (
    <Stack
      direction={'row'}
      spacing={4}
      sx={{
        alignItems: 'center',
      }}
    >
      <Stack
        direction={'row'}
        spacing={1}
        sx={{
          alignItems: 'center',
        }}
      >
        <ThumbUpIcon fontSize="inherit" />
        <Typography>0</Typography>
      </Stack>
      <Stack
        direction={'row'}
        spacing={1}
        sx={{
          alignItems: 'center',
        }}
      >
        <ThumbDownIcon fontSize="inherit" />
        <Typography>10</Typography>
      </Stack>
    </Stack>
  );
}
