import { createTheme } from '@mui/material/styles';

declare module '@mui/material/styles' {
  interface Theme {
    status: {
      green: string;
      user:string;
    };
  }
  // allow configuration using `createTheme`
  interface ThemeOptions {
    status?: {
      green?: string;
      user:string
    };
  }
}

const theme = createTheme({
  status: {
    green: '#04C880',
    user:'#F8C200'
  },
});

export default theme