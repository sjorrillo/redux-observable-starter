import { withStyles } from '@material-ui/core';

const styles = (theme) => ({
  '@global': {
    /**
     * Disable the focus outline, which is default on some browsers like
     * chrome when focusing elements
     */
    '*:focus': {
      outline: 0,
    },
    '.text-white': {
      color: theme.palette.common.white,
    },
    '.container': {
      width: '100%',
      paddingRight: theme.spacing(4),
      paddingLeft: theme.spacing(4),
      marginRight: 'auto',
      marginLeft: 'auto',
      [theme.breakpoints.up('sm')]: {
        maxWidth: 540,
      },
      [theme.breakpoints.up('md')]: {
        maxWidth: 720,
      },
      [theme.breakpoints.up('lg')]: {
        maxWidth: 1170,
      },
    },
    '.row': {
      display: 'flex',
      flexWrap: 'wrap',
      marginRight: -theme.spacing(2),
      marginLeft: -theme.spacing(2),
    },
  },
});

const globalStyles = () => null;

export const GlobalStyles = withStyles(styles, { withTheme: true })(globalStyles);
