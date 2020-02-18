import {
    withStyles,
    MuiThemeProvider,
    createMuiTheme
} from "@material-ui/core/styles";
const muiBaseTheme = createMuiTheme();

const theme = {
    overrides: {
        MuiTypography: {
        root: {
          "&.MuiTypography--01": {
            fontSize: "2em",
            fontFamily: 'Kaushan Script',
            
          }
        }
      },
      MuiContainer: {
        root: {
          "&.MuiContainer--01": {
            margin:"0px",
            
          }
        }
      },
    }
  };

  export {muiBaseTheme,theme};