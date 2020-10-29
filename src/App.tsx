import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Navigation, About, Home, Viewer } from './components';

function App() {

  return (
    <Router>
       <Navigation />
      <Switch>
          <Route path="/" exact component={() => <Home />} />
          <Route path="/about" exact component={() => <About />} />
          <Route path="/viewer/:slug" exact component={() => <Viewer />} />
      </Switch> 
    </Router>
  );
}

export default App;
