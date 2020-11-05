import React from "react";
import Typography from '@material-ui/core/Typography';

function About() {
  return (
    <div className="about">
      <div className="container">
        <br/>
      <Typography variant="h3">About</Typography><br/>
      <Typography variant="h6">A Microservices example project using Azure functions.</Typography>
      </div>
    </div>
  );
}

export default About;