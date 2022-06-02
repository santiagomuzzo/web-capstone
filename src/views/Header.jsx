import { AuthenticatedTemplate, UnauthenticatedTemplate, useMsal } from "@azure/msal-react";
import { Link } from 'react-router-dom';
import '../styles/Header.css';
import logo from '../assets/logo.png';
import { Dropdown} from "react-bootstrap";

import { loginRequest } from "../authConfig";

export const Header = () => {
    const { instance } = useMsal();
    return (
        <div className='navbar'>
            <div className="content">
            <Link to="/"><img src={logo} class="logo" alt="Main Logo" /></Link>    
            <AuthenticatedTemplate>
                <div className="ml-auto">
                    <ul>
                    <li>
                        <Link to="/Dashboard" style={{ textDecoration: 'none' }}><button className='boton-sesion' ><span>Dashboard</span></button></Link>
                    </li>
                    <li>
                        <Dropdown.Item as="button" className= "boton-sesion" onClick={() => instance.logoutRedirect({ postLogoutRedirectUri: "/" })}>Cerra Sesión</Dropdown.Item>
                    </li>
                    </ul>
                </div>
            </AuthenticatedTemplate>
            <UnauthenticatedTemplate>
                <Dropdown.Item className= "boton-sesion" as="button" onClick={() => instance.loginRedirect(loginRequest)}>Iniciar Sesión</Dropdown.Item>
            </UnauthenticatedTemplate>
            </div>
        </div>
    );
};
export default Header;