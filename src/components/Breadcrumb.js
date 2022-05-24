import * as React from "react";
import { emphasize, styled } from "@mui/material/styles";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Chip from "@mui/material/Chip";
//import HomeIcon from '@mui/icons-material/Home';
//import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { useNavigate } from "react-router-dom";
import { useDomain, defineDomain } from "../useDomain";

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
  return (
    <div role="presentation">
      <br />
      <Breadcrumbs
        aria-label="breadcrumb"
        separator={<NavigateNextIcon fontSize="small" />}
      >
        <StyledBreadcrumb
          component="a"
          onClick={() => navigate("/Proyects")}
          label="Proyectos"
        />

        {domain.projectId && (
          <StyledBreadcrumb
            component="a"
            onClick={() => navigate(`/Proyects/${domain.projectId}/Sites`)}
            label="Sitios"
          />
        )}
        {domain.siteId && (
          <StyledBreadcrumb
            component="a"
            onClick={() => navigate(`/Proyects/${domain.projectId}/Sites/${domain.siteId}/Units`)}
            label="Unidades"
          />
        )}
        {domain.unitId && (
          <StyledBreadcrumb
            component="a"
            onClick={() => navigate(`/Proyects/${domain.projectId}/Sites/${domain.siteId}/Units/${domain.unitId}/Levels`)}
            label="Niveles"
          />
        )}
        {domain.levelId && (
          <StyledBreadcrumb
            component="a"
            onClick={() => navigate(`/Proyects/${domain.projectId}/Sites/${domain.siteId}/Units/${domain.unitId}/Levels/${domain.levelId}/Layers`)}
            label="Capas"
          />
        )}
      </Breadcrumbs>
      <br />
      <br />
    </div>
  );
}
