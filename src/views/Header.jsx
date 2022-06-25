import React, { useState } from 'react'
import styled from 'styled-components'
import BurguerButton from './BurguerButton'

import { AuthenticatedTemplate, UnauthenticatedTemplate, useMsal } from "@azure/msal-react";
import { Link } from 'react-router-dom';

import logo from '../assets/logo.png';
import { Dropdown} from "react-bootstrap";

import { loginRequest } from "../authConfig";
import Button from '@mui/material/Button';

const buttonStyle = {
    padding: '22px',
    borderRadius: '0px',
    color: '#000000',
    fontSize: '0.6rem',
    fontFamily: 'georgia'
};

function Header() {

  const { instance } = useMsal();

  const [clicked, setClicked] = useState(false)
  const handleClick = () => {
    setClicked(!clicked)
  }
  return (
    <>
      <NavContainer>
      <Link to="/"><img src={logo} class="logo" alt="Main Logo" /></Link>
        
        <div className={`links ${clicked ? 'active' : ''}`}> 
        
            <AuthenticatedTemplate>
            <ul>
            <li>
            <Link to="/Proyects" style={{ textDecoration: 'none' }}><a onClick={`${clicked ? 'active' : ''}`} className='boton-navbar' ><Button size = "small" style={buttonStyle}><h4>Proyectos</h4></Button></a></Link>
            </li>
            <li>
            <Link to="/Dashboard" style={{ textDecoration: 'none' }}><a onClick={`${clicked ? 'active' : ''}`} className='boton-navbar' ><Button size = "small" style={buttonStyle}><h4>Tablero</h4></Button></a></Link>
            </li>
            <li>
            <Link to="/" style={{ textDecoration: 'none' }}><a onClick={`${clicked ? 'active' : ''}`} className='boton-navbar' ><Button size = "small" style={buttonStyle}><h4>Informes</h4></Button></a></Link>
            </li>
            
            <li>
                <Dropdown.Item as="text" className='boton-sesion'>
                    <Button  size="small" variant="contained" style={{ backgroundColor: '#009e45' }} onClick={() => instance.logoutRedirect({ postLogoutRedirectUri: "/" })}>
                        Cerrar Sesión
                    </Button>
                </Dropdown.Item>
            </li>
            </ul>
            </AuthenticatedTemplate>
            
            <UnauthenticatedTemplate>
            <ul>
            <li>
            <Link to="/Proyects" style={{ textDecoration: 'none' }}><a onClick={`${clicked ? 'active' : ''}`} className='boton-navbar' ><Button size = "small" style={buttonStyle}>Proyectos</Button></a></Link>
            </li>
            <li>
            <Dropdown.Item as="text">
                <Button  size="small" variant="contained" style={{ backgroundColor: '#009e45' }} onClick={() => instance.loginRedirect(loginRequest)}>
                    Iniciar Sesión
                </Button>
            </Dropdown.Item>
            </li>
            </ul>
            </UnauthenticatedTemplate>

        </div>

        <div className='burguer'>
          <BurguerButton clicked={clicked} handleClick={handleClick} />
        </div>

        
      </NavContainer>
      <BgDiv className={`initial ${clicked ? 'active' : ''}`}></BgDiv>
    </>
  )
}

export default Header

const NavContainer = styled.nav`
  z-index: 999;
  position: fixed;
  width: 100%;
  background-color: #e4e4e4;
  display: flex;
  align-items: center;
  justify-content: space-between;
  a{
    color: white;
    text-decoration: none;
  }

  .logo{
    margin-left: 20px;
  }

  .links{
    padding: 0 5% 0 0;
    position: absolute;
    top: -700px;
    left: -2000px;
    right: 0;
    margin-left: auto;
    margin-right: auto;
    text-align: center;
    transition: all .5s ease;
    @media(min-width: 760px){
      position: initial;
      margin: 0;
      a{
        font-size: 1rem;
        color: white;
        display: inline;
      }
      display: block;
    }
  }
  .links.active{
    width: 100%;
    display: block;
    position: absolute;
    margin-left: auto;
    margin-right: auto;
    top: 100%;
    left: 0;
    right: 0;
    text-align: center;
    a{
      font-size: 2rem;
      color: white;
    }
  }
  .links.active ul{
    display: block;
    margin: 0 50% 0 50%;
  }
  .links.active ul li{
    border-radius: 10px;
    margin-top: 1.5rem;
  }




  .burguer{
    padding: 0 3% 0 0;
    @media(min-width: 760px){
      display: none;
    }
  }

  .boton-navbar{
    text-decoration: none;
    color: #000000;
    font-size: 0.6rem;
    height: 100%;
    display: flex;
    font-family: georgia;
  }

  .boton-navbar::before {
    content: "";
    height: 3px;
    width: 0%;
    background: #009e45;
    position: absolute;
    left: 0;
    bottom: 0px;
    transition: 0.4s ease-out;
  }

  .boton-navbar:hover::before {
    width: 100%;
  }

  .links ul{
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .links ul li{
    list-style: none;
    position: relative;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 0 0 10px;
  }

  .boton-sesion{
    margin: 0 0 0 10px;
  }
`

const BgDiv = styled.div`
  background-color: #666666;
  position: absolute;
  top: -1000px;
  left: -1000px;
  width: 100%;
  height: 100%;
  z-index: -1;
  transition: all .6s ease ;
  
  &.active{
    border-radius: 0 0 30% 0;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
`