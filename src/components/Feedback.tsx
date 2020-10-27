import React from "react";

function Feedback() {
  return (
    <div className="feedback">
      <div className="container">
        <div className="row align-items-center my-5">
          <div className="col-lg-5">
            <h1 className="font-weight-light">Feedback</h1>
            <p>
              Please provide your feedback using the form below.
              </p>
          </div>
        </div>
        <form id="feedback-form" method="POST">
            <div className="form-group">
              <label>First name: *</label><br></br>
              <input type="text" name="fname" className="input" placeholder="First Name" required/>
              <br></br>
              <label>Last name: *</label><br></br>
              <input type="text" name="lname" className="input" placeholder="Last Name" required/>
              <br></br>
              <label>Email: *</label><br></br>
              <input type="text" name="email" className="input" placeholder="Your Email Address" required/>
            </div>
            <div className="form-group">
              <label>Your feedback: *</label><br></br>
              <textarea className="textarea" name="message" placeholder="Comments" required></textarea>
            </div>
            <div className="form-group">
              <input type="submit" value="Submit" />
            </div>
          </form>
      </div>
    </div>
  );
}

export default Feedback;