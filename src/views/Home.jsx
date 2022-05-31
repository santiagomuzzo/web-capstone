import { AuthenticatedTemplate } from "@azure/msal-react";
import * as React from "react";
import background from '../assets/background.jpeg';
import '../styles/App.css';

function Home() {
  return (
    <div className="App">
      <header className="App-header">
        <div class="">
          <h1>Bienvenido a Mankuk app!</h1>
          <img src={background} className="App-logo" alt="logo" />
          <h4>Para comenzar a registrar tus fichas arquelogicas, selecciona el proyecto en el que estas trabajando!</h4>
        </div>
      </header>
    </div>
  );
}


export default Home;
