import React from "react";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

function Feedback() {
  return (
    <div className="feedback">
      <div className="container">
            <h1 className="font-weight-light">Feedback</h1>
            <p>
              Please provide your feedback using the form below.
              </p>
          

        <form className='feedback' noValidate autoComplete="off">
          <TextField id="fname" required label="First name" variant="outlined" /><br/><br/>
          <TextField id="lname" required label="Last name" variant="outlined" /><br/><br/>
          <TextField id="email" required label="Email" variant="outlined" /><br/><br/>
          <TextField id="company" required label="Company" variant="outlined" /><br/><br/>
          <TextField id="message" required multiline label="Feedback Comments" variant="outlined" /><br/><br/>
          </form>

          <Button color="primary" variant="contained" id="submit">Submit</Button>
  
      </div>
    </div>
  );
}

export default Feedback;