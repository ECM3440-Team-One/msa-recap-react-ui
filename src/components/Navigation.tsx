import React from "react";
import { withRouter } from "react-router-dom";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import { unstable_createMuiStrictModeTheme as createMuiTheme } from '@material-ui/core/styles';
import { blue } from '@material-ui/core/colors';

const navigationTheme = createMuiTheme({
  palette: {
    primary: {
      main: blue[900],
      contrastText: '#fff'
    }
  }
});

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1
    },
    menuButton: {
      color: '#fff',
      textTransform: 'none',
      '&:hover': {
        color: '#fff'
      }
    },
    titleSpacer: {
      flexGrow: 1,
      '&:hover': {
        backgroundColor: 'transparent',
        cursor: 'default'
      }
    }
  }),
);

function Navigation() {
  const classes = useStyles();

  return (
    <ThemeProvider theme={navigationTheme}>
    <div>
      <AppBar position="static" className={classes.root}>
        <Toolbar>
          <Button color="primary" variant="text" disableElevation disableRipple className={classes.menuButton} href="/" style={{ fontSize: '28px'}}>Recap</Button>
          <Button color="primary" variant="text" disableElevation className={classes.titleSpacer}></Button>
          <Button color="primary" variant="text" disableElevation className={classes.menuButton} href="/" style={{ fontSize: '16px'}}>Create</Button>
          <Button color="primary" variant="text" disableElevation className={classes.menuButton} href="/about" style={{ fontSize: '16px'}}>About</Button>
          <Button color="primary"  variant="text" disableElevation className={classes.menuButton} href="/feedback" style={{ fontSize: '16px'}}>Feedback</Button>

        </Toolbar>
      </AppBar>
    </div>
    </ThemeProvider>
  );
}

export default withRouter(Navigation);