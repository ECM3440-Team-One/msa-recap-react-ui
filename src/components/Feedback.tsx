import React from "react";
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { ThemeProvider } from '@material-ui/styles';
import { unstable_createMuiStrictModeTheme as createMuiTheme } from '@material-ui/core/styles';
import { blue } from '@material-ui/core/colors';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      '& .MuiTextField-root': {
        margin: theme.spacing(1),
        width: '35ch',
      },
    },
  }),
);

const feedbackTheme = createMuiTheme({
  palette: {
    primary: {
      main: blue[900],
    }
  }
});

function Feedback() {
  const classes = useStyles();
  return (
    <ThemeProvider theme={feedbackTheme}>
    <div className="feedback">
      <div className="container">
        <br/>
        <Typography variant="h3">Feedback</Typography><br />
        <Typography variant="h6">Please provide your feedback using the form below.</Typography><br/>

        <form className={classes.root} noValidate autoComplete="off">
          <TextField id="fname" required label="First name" variant="outlined" /><br /><br />
          <TextField id="lname" required label="Last name" variant="outlined" /><br /><br />
          <TextField id="email" required label="Email" variant="outlined" /><br /><br />
          <TextField id="company" required label="Company" variant="outlined" /><br /><br />
          <TextField id="message" required multiline rows={4} label="Feedback comments" variant="outlined" /><br /><br />
          <Button color="primary" variant="contained" id="submit" disabled>Submit</Button>
        </form>
        <br/>

      </div>
    </div>
    </ThemeProvider>
  );
}

export default Feedback;