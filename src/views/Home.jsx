import { AuthenticatedTemplate } from "@azure/msal-react";
import * as React from "react";
import { Link } from "react-router-dom";
import background from '../assets/background.jpeg';
import '../styles/App.css';

function Home() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={background} className="App-logo" alt="logo" />
        <AuthenticatedTemplate>
          <button class="home_button">
            <nav>
              <Link to="/Form">New Form</Link>
            </nav>
          </button>
        </AuthenticatedTemplate>
      </header>
    </div>
  );
}


export default Home;
