import * as React from "react";
import { emphasize, styled } from "@mui/material/styles";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Chip from "@mui/material/Chip";
//import HomeIcon from '@mui/icons-material/Home';
//import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { useNavigate } from "react-router-dom";
import { useDomain, defineDomain } from "../useDomain";

import { useMsal, useAccount } from "@azure/msal-react";
import { loginRequest } from "../authConfig";


const StyledBreadcrumb = styled(Chip)(({ theme }) => {
  const backgroundColor =
    theme.palette.mode === "light"
      ? theme.palette.grey[100]
      : theme.palette.grey[800];

  return {
    backgroundColor,
    height: theme.spacing(3),
    color: theme.palette.text.primary,
    fontWeight: theme.typography.fontWeightRegular,
    "&:hover, &:focus": {
      backgroundColor: emphasize(backgroundColor, 0.06),
    },
    "&:active": {
      boxShadow: theme.shadows[1],
      backgroundColor: emphasize(backgroundColor, 0.12),
    },
  };
}); // TypeScript only: need a type cast here because https://github.com/Microsoft/TypeScript/issues/26591

export default function CustomizedBreadcrumbs() {
  const { domain, setDomain } = useDomain();
  const navigate = useNavigate();

  //aa

  const [projectList, setProjectList] = React.useState([])
  var projectName = "";
  const [siteList, setSiteList] = React.useState([])
  var siteName = "";
  const [unitList, setUnitList] = React.useState([])
  var unitName = "";
  const [levelList, setLevelList] = React.useState([])
  var levelIndex;

  const { instance, accounts} = useMsal();
  const account = useAccount(accounts[0] || {});
  const [accessToken, setAccessToken] = React.useState(null);
  function RequestAccessToken() {
      const request = {
          ...loginRequest,
          account: account
      };

      // Silently acquires an access token which is then attached to a request for Microsoft Graph data
      instance.acquireTokenSilent(request).then((response) => {
          setAccessToken(response.accessToken);
      }).catch((e) => {
          instance.acquireTokenPopup(request).then((response) => {
              setAccessToken(response.accessToken);
          });
      });
  }
  

  React.useEffect(() => {  

      if (!accessToken && !projectList.length) {
          RequestAccessToken();
          obtainData_project();

      
      } else if(accessToken && !projectList.length){
          obtainData_project();

      }
      
  }, [accessToken, navigate]);

  React.useEffect(() => { 
    if (domain.projectId === "") {
        console.log("Se recetea SITEEES")
        setSiteList([]);
    }
    else if(accessToken && !siteList.length){
        obtainData_site();
    }  
    else {
      console.log("NINGUNA de las anteriores")
    }
    
  }, [accessToken, domain.projectId]);

  React.useEffect(() => { 
    if (domain.siteId === "") {
        setUnitList([]);
    }
    else if(accessToken && !unitList.length){
        obtainData_unit();
    }  
    
  }, [accessToken, domain.siteId]);

  React.useEffect(() => { 
    if (domain.unitId === "") {
        setLevelList([]);
    }
    else if(accessToken && !levelList.length){
        obtainData_level();
    }  
    
  }, [accessToken, domain.unitId]);


      
  const obtainData_project = async () => {   
      defineDomain("", "all", domain, setDomain); 
      const bearer = `Bearer ${accessToken}`; 
      const data = await fetch(`${process.env.REACT_APP_API_URL}/project`,{
          method: "GET",
          headers: {
          Authorization: bearer
          }
      });
      const raw = await data.json()
      const array = []
      raw.forEach((obj) => {
          if (obj.status === "Activo") {
              array.push(obj)
          }
        })
      setProjectList(array)
  }

  const obtainData_site = async () => {
    defineDomain("", "site", domain, setDomain);
    const id = window.location.pathname.split("/")[2];
    const bearer = `Bearer ${accessToken}`; 
    const data = await fetch(`${process.env.REACT_APP_API_URL}/project/${domain.projectId}/excavationSites`,{
        method: "GET",
        headers: {
        Authorization: bearer}
    });
    const raw = await data.json()
    const array = []
    raw.forEach((obj) => {
        if (obj.status === "Activo") {
            array.push(obj)
        }
      })
      setSiteList(array)
  }

  const obtainData_unit = async () => {
    defineDomain("", "unit", domain, setDomain);
    const bearer = `Bearer ${accessToken}`; 
    const data = await fetch(`${process.env.REACT_APP_API_URL}/unit/excavationSite/${domain.siteId}`,{
        method: "GET",
        headers: {
        Authorization: bearer}
    })
    const raw = await data.json()
    const array = []
    raw.forEach((obj) => {
        if (obj.status === "Activo") {
            array.push(obj)
        }
      })
    setUnitList(array)
  }

  const obtainData_level = async () => {
    defineDomain("", "level", domain, setDomain);
    const bearer = `Bearer ${accessToken}`; 
    const data = await fetch(`${process.env.REACT_APP_API_URL}/unit/${domain.unitId}/levels`,{
        method: "GET",
        headers: {
        Authorization: bearer}
    })
    const raw = await data.json()
    const array = []
    raw.forEach((obj) => {
        if ( obj.status === "Activo") {
           array.push(obj)
        }
    })

    setLevelList(array)
  }

  
  console.log("DOMAIN project id", domain)
  console.log("PROJECTLIST: ", projectList)
  console.log("SITELIST: ", siteList)
  console.log("UNITLIST: ", unitList)
  console.log("LEVELLIST: ", levelList)

  
  //aa

  return (
    <div role="presentation">
      <br />
      <Breadcrumbs
        aria-label="breadcrumb"
        separator={<NavigateNextIcon fontSize="small" />}
      >

        {domain.projectId && (
          <StyledBreadcrumb
            component="a"
            onClick={() => navigate(`/Proyects/${domain.projectId}/Sites`)}
            
            {...projectList.forEach((obj) => {
              if (obj._id === domain.projectId) {
                projectName = obj.name
                
              }
            })}
            label = {projectName}
          />
        )}
        {domain.siteId && (
          <StyledBreadcrumb
            component="a"
            onClick={() => navigate(`/Proyects/${domain.projectId}/Sites/${domain.siteId}/Units`)}
            
            {...siteList.forEach((obj) => {
              if (obj._id === domain.siteId) {
                siteName = obj.name
                
              }
            })}
            label = {siteName}
          />
        )}
        {domain.unitId && (
          <StyledBreadcrumb
            component="a"
            onClick={() => navigate(`/Proyects/${domain.projectId}/Sites/${domain.siteId}/Units/${domain.unitId}/Levels`)}
            
            {...unitList.forEach((obj) => {
              if (obj._id === domain.unitId) {
                unitName = obj.name
                
              }
            })}
            label = {unitName}
          />
        )}
        {domain.levelId && (
          <StyledBreadcrumb
            component="a"
            onClick={() => navigate(`/Proyects/${domain.projectId}/Sites/${domain.siteId}/Units/${domain.unitId}/Levels/${domain.levelId}/Layers`)}
            
            {...levelList.forEach((obj) => {
              if (obj._id === domain.levelId) {
                levelIndex = obj.index
                
              }
            })}
            label = {levelIndex}
          />
        )}
      </Breadcrumbs>
      <br />
    </div>
  );
}