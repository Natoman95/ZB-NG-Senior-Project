import createMuiTheme from 'material-ui/styles/createMuiTheme';

/**
 * Sets the theme colors and font for the whole app
 */
const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#014983',
      contrastText: '#fff',
    },
    secondary: {
      main: '#00AEEF',
      contrastText: '#fff',
    },
    error: { // We use this for notifications
      main: '#F44336',
      contrastText: '#fff',
    },
  },
  typography: {
    fontFamily: 'Arial',
  },
  root: {
    flexGrow: 1,
    width: '100%',
  },
});

export default theme