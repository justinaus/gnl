import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  spacing: 4,
  typography: {
    fontFamily: ['SUIT', 'sans-serif'].join(','),
    button: {
      textTransform: 'none', // 이거 없음 영어 다 대문자로 됨.
    },
  },
  palette: {
    primary: {
      // main: '#546e7a',
      main: '#c67330',
      light: '#ce9273',
      dark: '#965d34',
    },
  },
});
