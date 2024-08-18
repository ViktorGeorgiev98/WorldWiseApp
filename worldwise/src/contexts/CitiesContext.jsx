import { createContext, useContext, useEffect, useState } from "react";
const URL = "http://localhost:8000";
const CitiesContext = createContext();

const CitiesProvider = ({ children }) => {
    const [cities, setCities] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
  
  
    useEffect(() => {
      const fetchCities = async() => {
        try {
          setIsLoading(true);
          const res = await fetch(`${URL}/cities`);
          const data = await res.json();
          setCities(data);
        } catch(err) {
          alert("There was an error fetching cities")
        } finally {
          setIsLoading(false);
        }
      }
      fetchCities();
    }, []);

    return (
        <CitiesContext.Provider value={{
            cities, isLoading
        }}>
            {children}
        </CitiesContext.Provider>
    );
};

const useCities = () => {
    const context = useContext(CitiesContext);
    if (context === undefined) {
        throw new Error("useCities must be used within a CitiesProvider");
    }
    return context;
}

export { CitiesProvider, useCities };

