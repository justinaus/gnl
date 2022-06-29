import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  spacing: 4,
  typography: {
    button: {
      textTransform: 'none', // 이거 없음 영어 다 대문자로 됨.
    },
  },
});
