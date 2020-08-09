import React, { Component, useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './components/home/Home';
import PlayerDetail from './components/Player_detail/PlayerDetail';
import NewGame from './components/newgame/NewGame';
import { connect } from 'react-redux';

class App extends Component {
 
  render() {
    return (
      <Router>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/player-detail" exact component={PlayerDetail} /> 
          
          <Route path="/new-game" exact component={NewGame} />                                          
        </Switch> 
      </Router>
    );
  }
}

export default App;


