import React, { Component } from 'react';
import 'semantic-ui-css/semantic.min.css';
import { Container } from 'semantic-ui-react';
import Login from './components/Login';
import Lobby from './components/Lobby';

class App extends Component {
  state = {};

  enterLobby(username){
    this.setState({
      username:username
    });
  }

  render() {
    let contents;
    if(this.state.username){
      contents = <Lobby/>
    }
    else{
      contents = <Login login = {this.enterLobby.bind(this)}/>
    }
    return (
      <Container>
        { contents }
      </Container>
    );
  }
  
}

export default App;
