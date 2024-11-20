import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  typography: {
    fontFamily: '"Afacad Flux", "sans-serif"', // Match Tailwind's font-family
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none', // Disable all-caps for all buttons
        },
      },
    },
  },

});

export default theme;
