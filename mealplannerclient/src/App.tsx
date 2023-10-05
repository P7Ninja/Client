import React from 'react';
import logo from './logo.svg';
import werewolf from './images/werewolf.png';
const Fade = require('react-reveal/Fade');
const Zoom = require('react-reveal/Zoom')
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Zoom>
          <img src={werewolf} className="App-logo" alt="logo" />
        </Zoom>
        <p>
          AWOOOOOOOOOOOOOOOOOOOOOOOOOO
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
