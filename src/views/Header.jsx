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
                
                    <ul>
                        <li>
                            <Link to="/Proyects" style={{ textDecoration: 'none' }}><a className='boton-navbar' >Proyectos</a></Link>
                        </li>
                        <li>
                            <Link to="/Dashboard" style={{ textDecoration: 'none' }}><a className='boton-navbar' >Tablero</a></Link>
                        </li>
                        <li>
                            <Link to="/" style={{ textDecoration: 'none' }}><a className='boton-navbar' >Cuerpos de Fichas</a></Link>
                        </li>
                        <li>
                            <Link to="/" style={{ textDecoration: 'none' }}><a className='boton-navbar' >Informes Especialistas</a></Link>
                        </li>
                    </ul>
                
                
                    <Dropdown.Item as="text" className= "boton-sesion" onClick={() => instance.logoutRedirect({ postLogoutRedirectUri: "/" })}>Cerrar Sesión</Dropdown.Item>
                
            </AuthenticatedTemplate>
            <UnauthenticatedTemplate>
                <ul>
                    <li>
                        <Link to="/Proyects" style={{ textDecoration: 'none' }}><a className='boton-navbar' >Proyectos</a></Link>
                    </li>
                    
                </ul>

                <Dropdown.Item className= "boton-sesion" as="text" onClick={() => instance.loginRedirect(loginRequest)}>Iniciar Sesión</Dropdown.Item>
                
            </UnauthenticatedTemplate>
            </div>
        </div>
    );
};
export default Header;