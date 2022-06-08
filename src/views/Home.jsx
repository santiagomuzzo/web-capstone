import { AuthenticatedTemplate } from "@azure/msal-react";
import * as React from "react";
import background from '../assets/background.jpeg';
import logo from '../assets/logo.png';
import '../styles/App.css';
import '../styles/Home.css';

function Home() {
  return (
    <div className="App">
      <div class="header">
        <div class="inner-header">
          <h1>Bienvenido a Mankuk!</h1>
          <img src={logo} className="App-logo" alt="logo" />
          <h4>Para comenzar a registrar tus fichas arquelogicas, selecciona el proyecto en el que estas trabajando!</h4>
        </div>
      </div>
    </div>
  );
}


export default Home;
