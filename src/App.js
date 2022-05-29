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

import { MsalProvider } from "@azure/msal-react";
import { ProvideDomain } from "./useDomain";

function App({ instance }) {
  return (
    <Router>
	  <MsalProvider instance={instance}>
	  <ProvideDomain>
      <div className="contianer">
			<Header/>
			<CustomizedBreadcrumbs />
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/SignIn" element={<SignIn />} />
				<Route path="/SignUp" element={<SignUp />} />
				<Route path="/Hello" element={<Hello/>} />
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
				<Route path="/Proyects/:id/Sites/:id/Units/:id/Levels" element={<IndexLevels />} />
				<Route path="/Proyects/:id/Sites/:id/Units/:id/Levels/new" element={<NewLevel />} />
				<Route path="/Proyects/:id/Sites/:id/Units/:id/Levels/:id" element={<LevelShow />} />
				<Route path="/Proyects/:id/Sites/:id/Units/:id/Levels/:id/Layers" element={<IndexLayers />} />
				<Route path="/Proyects/:id/Sites/:id/Units/:id/Levels/:id/Layers/new" element={<NewLayer />} />
				<Route path="/Proyects/:id/Sites/:id/Units/:id/Levels/:id/Layers/:id" element={<LayerShow />} />
			</Routes>
		</div>
		</ProvideDomain>
	  </MsalProvider>			
    </Router>
  );
}

export default App;
