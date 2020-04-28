import { createMuiTheme, responsiveFontSizes } from '@material-ui/core';

const muiTeme = createMuiTheme({});

export const theme = responsiveFontSizes(muiTeme);
