import { Chip, Stack } from '@mui/material';
import { Restaurant } from '@pages/api/restaurants';
import { useCallback } from 'react';

type Props = Pick<Restaurant, 'link' | 'naverId' | 'name'>;

function LinkChip({ label, link }: { label: string; link: string }) {
  const handleClick = useCallback(() => {}, []);

  return (
    <a href={link} target={'_blank'} rel="noreferrer">
      <Chip
        label={label}
        variant="outlined"
        size="small"
        sx={{
          marginBottom: 1,
        }}
        onClick={handleClick} // Chips with the onClick prop defined change appearance on focus, hover, and click.
      />
    </a>
  );
}

export default function Links({ name, naverId, link }: Props) {
  const { mangpl, micherin, blueribbon } = link;

  return (
    <Stack direction={'row'} spacing={2} flexWrap="wrap">
      {mangpl && <LinkChip label="Mangoplate" link={mangpl} />}
      <LinkChip
        label="Naver"
        link={`https://map.naver.com/v5/entry/place/${naverId}`}
      />
      <LinkChip
        label="Google"
        link={`https://www.google.com/search?q=${name}`}
      />
      {micherin && <LinkChip label="Micherin" link={micherin} />}
      {blueribbon && <LinkChip label="Blueribbon" link={blueribbon} />}
    </Stack>
  );
}
