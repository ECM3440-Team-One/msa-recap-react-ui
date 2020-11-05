import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Navigation, About, Home, Feedback } from './components';

function App() {

  return (
    <Router>
       <Navigation />
      <Switch>
          <Route path="/" exact component={() => <Home />} />
          <Route path="/feedback" exact component={() => <Feedback />} />
          <Route path="/about" exact component={() => <About />} />
      </Switch> 
    </Router>
  );
}

export default App;
