import * as React from "react";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Form from "./views/Forms/New";
import Home from "./views/Home";
import SignIn from "./views/Signin";
import SignUp from "./views/SignUp";
import Header from "./views/Header";
import Hello from "./views/Hello";
import FormList from "./views/Forms/Index";
import Users from "./views/Users";
import FormShow from "./views/Forms/Show";
import Proyectos from "./views/Proyecto/Index";
import CustomizedBreadcrumbs from "./components/Breadcrumb";
import NewProject from "./views/Proyecto/New";
import NewSite from "./views/Sitio/New";
import NewUnit from "./views/Unidad/New";
import NewLevel from "./views/Nivel/New";
import NewLayer from "./views/Capa/New";
import ProyectShow from "./views/Proyecto/Show";
import SiteShow from "./views/Sitio/Show";
import UnitShow from "./views/Unidad/Show";
import LevelShow from "./views/Nivel/Show";
import LayerShow from "./views/Capa/Show";
import IndexSites from "./views/Proyecto/IndexSites";
import IndexUnits from "./views/Sitio/IndexUnits";
import IndexLevels from "./views/Unidad/IndexLevels";
import IndexLayers from "./views/Nivel/IndexLayers";
import Dashboard from "./views/Unidad/dashboard";
import UnitPhoto from "./views/Unidad/NewPhoto";
import UnitPhotoShow from "./views/Unidad/Photo";
import LevelPhoto from "./views/Nivel/NewPhoto";
import LevelPhotoShow from "./views/Nivel/Photo";

import { MsalProvider } from "@azure/msal-react";
import { ProvideDomain } from "./useDomain";

import './styles/App.css';
import './styles/Home.css';

function App({ instance }) {
  return (
    <Router>
	  <MsalProvider instance={instance}>
	  <ProvideDomain>
      <div className="App">
			<Header/>
			
			<div class="header">
				<CustomizedBreadcrumbs />
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/SignIn" element={<SignIn />} />
					<Route path="/SignUp" element={<SignUp />} />
					<Route path="/Hello" element={<Hello/>} />
					<Route path="/Dashboard" element={<Dashboard />} />
					<Route path="/Users" element={<Users />} />
					<Route path="/Form" element={<Form />} />
					<Route path="/Forms" element={<FormList />} />
					<Route path="/Forms/:id" element={<FormShow />} />
					<Route path="/Proyects" element={<Proyectos />} />
					<Route path="/Proyects/new" element={<NewProject />} />
					<Route path="/Proyects/:id" element={<ProyectShow />} />
					<Route path="/Proyects/:id/Sites" element={<IndexSites />} />
					<Route path="/Proyects/:id/Sites/new" element={<NewSite />} />
					<Route path="/Proyects/:id/Sites/:id" element={<SiteShow />} />
					<Route path="/Proyects/:id/Sites/:id/Units" element={<IndexUnits />} />
					<Route path="/Proyects/:id/Sites/:id/Units/new" element={<NewUnit />} />
					<Route path="/Proyects/:id/Sites/:id/Units/:id" element={<UnitShow />} />
					<Route path="/Proyects/:id/Sites/:id/Units/:id/Photos" element={<UnitPhoto />} />
					<Route path="/Proyects/:id/Sites/:id/Units/:id/Photos/:id" element={<UnitPhotoShow />} />
					<Route path="/Proyects/:id/Sites/:id/Units/:id/Levels" element={<IndexLevels />} />
					<Route path="/Proyects/:id/Sites/:id/Units/:id/Levels/new" element={<NewLevel />} />
					<Route path="/Proyects/:id/Sites/:id/Units/:id/Levels/:id" element={<LevelShow />} />
					<Route path="/Proyects/:id/Sites/:id/Units/:id/Levels/:id/Photos" element={<LevelPhoto />} />
					<Route path="/Proyects/:id/Sites/:id/Units/:id/Levels/:id/Photos/:id" element={<LevelPhotoShow />} />
					<Route path="/Proyects/:id/Sites/:id/Units/:id/Levels/:id/Layers" element={<IndexLayers />} />
					<Route path="/Proyects/:id/Sites/:id/Units/:id/Levels/:id/Layers/new" element={<NewLayer />} />
					<Route path="/Proyects/:id/Sites/:id/Units/:id/Levels/:id/Layers/:id" element={<LayerShow />} />
				</Routes>
				{/* Background Waves */}
				<div>
					<svg class="waves" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 24 150 28" preserveAspectRatio="none" shape-rendering="auto">
						<defs>
							<path id="gentle-wave" d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z" />
						</defs>
						<g class="parallax">
							<use xlinkHref="#gentle-wave" x="48" y="0" fill="rgba(255,255,255,0.7" />
							<use xlinkHref="#gentle-wave" x="48" y="3" fill="rgba(255,255,255,0.5)" />
							<use xlinkHref="#gentle-wave" x="48" y="5" fill="rgba(255,255,255,0.3)" />
							<use xlinkHref="#gentle-wave" x="48" y="7" fill="#fff" />
						</g>
					</svg>
				</div>
			</div>
		</div>
		</ProvideDomain>
	  </MsalProvider>			
    </Router>
  );
}

export default App;
