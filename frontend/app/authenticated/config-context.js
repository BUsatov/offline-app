import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Axios from "axios";

import CATEGORIES from "app/constants/categories";

export const Context = React.createContext("categories");

const ConfigContext = ({ children }) => {
  const [categories, setCategories] = useState([]);
  const [resourceTypes, setResourceTypes] = useState([]);
  useEffect(() => {
    async function fetchCategories() {
      const categoriesResp = await Axios.get("/api/v1/categories/");
      setCategories(
        categoriesResp.data.map(cat => ({ ...cat, ...CATEGORIES[cat.name] }))
      );
    }
    async function fetchResourceTypes() {
      const resourceTypesResp = await Axios.get("/api/v1/resource-types/");
      setResourceTypes(resourceTypesResp.data);
    }
    fetchCategories();
    fetchResourceTypes();
  }, []);
  return (
    <Context.Provider value={{ categories, resourceTypes }}>
      {children}
    </Context.Provider>
  );
};
ConfigContext.propTypes = {
  children: PropTypes.node
};
export default ConfigContext;
