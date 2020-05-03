import { createMuiTheme, responsiveFontSizes } from '@material-ui/core';

const muiTeme = createMuiTheme({
  palette: {
    type: 'light',
  },
});

export const theme = responsiveFontSizes(muiTeme);
