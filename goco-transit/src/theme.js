import createMuiTheme from 'material-ui/styles/createMuiTheme';

// Theme for the whole app
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
    tertiaryLight: "#B2BB1C",
    tertiaryDark: "#31342B",
    caution: "#FDB913",
    warning: "#DE571f",
    danger: "#B53228",
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