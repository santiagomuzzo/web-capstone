import { AuthenticatedTemplate } from "@azure/msal-react";
import * as React from "react";
import background from '../assets/background.jpeg';
import '../styles/App.css';

function Home() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={background} className="App-logo" alt="logo" />
      </header>
    </div>
  );
}


export default Home;
