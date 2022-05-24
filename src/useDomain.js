import React, { createContext, useState, useContext } from "react";

export const DomainContext = createContext(null);

export const useDomain = () => {
  return useContext(domainContext);
};

const domainContext = createContext(null);

export function ProvideDomain({ children }) {
  const context = Domain();
  return (
    <domainContext.Provider value={context}>{children}</domainContext.Provider>
  );
}

function Domain() {
  const [domain, setDomain] = useState(defaultDomain);
  // const providerValue = useMemo(() => ({ domain, setDomain }), [domain, setDomain])
  return { domain, setDomain };
}

const defaultDomain = {
  projectId: "",
  siteId: "",
  units: [],
  unitId: "",
  levelId: "",
  layerId: "",
};

export const defineDomain = (id, depth, domain, setDomain) => {
  switch (depth) {
    case "all":
      setDomain(defaultDomain);
      break;
    case "project":
      setDomain({
        projectId: id,
        siteId: "",
        units: [],
        unitId: "",
        levelId: "",
        layerId: "",
      });
      break;
    case "site":
      setDomain({
        ...domain,
        siteId: id,
        // agregar unitsId en array
        unitId: "",
        levelId: "",
        layerId: "",
      });
      break;
    case "unit":
      setDomain({ ...domain, unitId: id, levelId: "", layerId: "" });
      break;
    case "level":
      setDomain({ ...domain, levelId: id, layerId: "" });
      break;
    case "layer":
      setDomain({ ...domain, layerId: id });
      break;
    default:
      console.log("ERROR: Wrong value.");
  }
};
