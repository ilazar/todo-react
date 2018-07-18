import React, { Component } from 'react';
import styled from 'styled-components';

const AppContainer = styled.div`
  text-align: center;
`;

const AppHeader = styled.div`
  background-color: #222;
  height: 50px;
  padding: 20px;
  color: white;
  > h1 {
    font-size: 1.5em;
  }
`;

class App extends Component {
  render() {
    return (
      <AppContainer>
        <AppHeader>
          <h1>Todo React App</h1>
        </AppHeader>
      </AppContainer>
    );
  }
}

export default App;
