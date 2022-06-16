import { AuthenticatedTemplate, UnauthenticatedTemplate, useMsal } from "@azure/msal-react";
import { Link } from 'react-router-dom';
import '../styles/Header.css';
import logo from '../assets/logo.png';
import { Dropdown} from "react-bootstrap";

import { loginRequest } from "../authConfig";
import Button from '@mui/material/Button';
import { borderRadius, color } from "@mui/system";
import {FaBars} from "react-icons/fa";
import styled from 'styled-components';
import {MobileIcon} from './Header.elements'

const buttonStyle = {
    padding: '22px',
    borderRadius: '0px',
    color: '#000000',
    fontSize: '0.6rem'
};




    


export const Header = () => {
    const { instance } = useMsal();
    
    return (
        <div className='navbar'>
            <div className="content">
            <Link to="/"><img src={logo} class="logo" alt="Main Logo" /></Link>  
            <MobileIcon>
                <FaBars/>
            </MobileIcon>

            <AuthenticatedTemplate>
                    
                    <ul>
                        <li>
                            <Link to="/Proyects" style={{ textDecoration: 'none' }}><a className='boton-navbar' ><Button size = "small" style={buttonStyle}>Proyectos</Button></a></Link>
                        </li>
                        <li>
                            <Link to="/Dashboard" style={{ textDecoration: 'none' }}><a className='boton-navbar' ><Button size = "small" style={buttonStyle}>Tablero</Button></a></Link>
                        </li>
                    </ul>
                
                    <Dropdown.Item as="text">
                    <Button  size="small" variant="contained" style={{ backgroundColor: '#009e45' }} onClick={() => instance.logoutRedirect({ postLogoutRedirectUri: "/" })}>
                                                    Cerrar Sesión
                    </Button>
                    </Dropdown.Item>

            </AuthenticatedTemplate>
            <UnauthenticatedTemplate>
                <ul>
                    <li>
                        <Link to="/Proyects" style={{ textDecoration: 'none' }}><a className='boton-navbar' >Proyectos</a></Link>
                    </li>
                    
                </ul>


                <Dropdown.Item as="text">
                <Button  size="small" variant="contained" style={{ backgroundColor: '#009e45' }} onClick={() => instance.loginRedirect(loginRequest)}>
                                                Iniciar Sesión
                </Button>
                </Dropdown.Item>
                

            </UnauthenticatedTemplate>
            </div>
        </div>
    );
};
export default Header;