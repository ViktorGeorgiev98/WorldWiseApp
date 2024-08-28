import { createContext, useContext, useEffect, useState } from "react";
const URL = "http://localhost:8000";
const CitiesContext = createContext();

const CitiesProvider = ({ children }) => {
    const [cities, setCities] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [currentCity, setCurrentCity] = useState([]);
  
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

    const getCity = async(id) => {
            try {
              setIsLoading(true);
              const res = await fetch(`${URL}/cities/${id}`);
              const data = await res.json();
              setCurrentCity(data);
            } catch(err) {
              alert("There was an error fetching cities")
            } finally {
              setIsLoading(false);
            }
    }

    const deleteCity = async(id) => {
      try {
        setIsLoading(true);
        const res = await fetch(`${URL}/cities/${id}`, {
          method: 'DELETE',
         });
        const data = await res.json();
        console.log(data);
        setCities((cities) => cities.filter(city => city.id !== id));
      } catch(err) {
        alert("There was an error deleting city")
      } finally {
        setIsLoading(false);
      }
  }

    const createCity = async(city) => {
      try {
        setIsLoading(true);
        const res = await fetch(`${URL}/cities`, {
          method: 'POST',
          body: JSON.stringify(city),
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const data = await res.json();
        console.log(data);
        setCities((cities) => [...cities, data]);
      } catch(err) {
        alert("There was an error fetching cities")
      } finally {
        setIsLoading(false);
      }
  }

    return (
        <CitiesContext.Provider value={{
            cities, isLoading, currentCity, getCity, createCity, deleteCity
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

