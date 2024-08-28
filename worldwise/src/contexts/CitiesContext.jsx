import { createContext, useContext, useEffect, useReducer, useState } from "react";
const URL = "http://localhost:8000";
const CitiesContext = createContext();

const initialState = {
  cities: [],
  isLoading: false,
  currentCity: {},
  error: '',
}

function reducer(state, action) {
  switch (action.type) {
    case 'loading':
      return {
        ...state, isLoading: true
      };
    case 'cities/loaded':
      return {
        ...state,
        isLoading: false,
        cities: action.payload
      };

    case 'city/loaded':
      return {
        ...state,
        isLoading: false,
        currentCity: action.payload,
      }
    case 'cities/created':
      return {
        ...state,
        isLoading: false,
        cities: [...state.cities, action.payload],
        currentCity: action.payload,
      }
    case 'cities/deleted':
      return {
        ...state,
        isLoading: false,
        cities: state.cities.filter(city => city.id!== action.payload)
      }
    case 'rejected':
      return {
        ...state, isLoading: false, error: action.payload
      };

    default:
      throw new Error(`Invalid action ${action.type}`);
  }
}

const CitiesProvider = ({ children }) => {
   const [{ cities, isLoading, currentCity }, dispatch] = useReducer(reducer, initialState);
  
    useEffect(() => {
      const fetchCities = async() => {
        try {
          dispatch({type: 'loading'});
          const res = await fetch(`${URL}/cities`);
          const data = await res.json();
          
          dispatch({type: 'cities/loaded', payload: data});
        } catch(err) {
          dispatch({type: 'rejected', payload: 'There was an error loading data'});
        }
      }
      fetchCities();
    }, []);

    const getCity = async(id) => {
            try {
              dispatch({type: 'loading'});
              const res = await fetch(`${URL}/cities/${id}`);
              const data = await res.json();
              dispatch({type: 'city/loaded', payload: data});
            } catch(err) {
              dispatch({type: 'rejected', payload: 'There was an error loading data'});
            } 
    }

    const deleteCity = async(id) => {
      try {
        dispatch({type: 'loading'});
        const res = await fetch(`${URL}/cities/${id}`, {
          method: 'DELETE',
         });
        const data = await res.json();
        console.log(data);
        dispatch({type: 'cities/deleted', payload: id});
      } catch(err) {
        dispatch({type: 'rejected', payload: 'There was an error loading data'});
      }
  }

    const createCity = async(city) => {
      try {
        dispatch({type: 'loading'});
        const res = await fetch(`${URL}/cities`, {
          method: 'POST',
          body: JSON.stringify(city),
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const data = await res.json();
        console.log(data);
        dispatch({type: 'cities/created', payload: data});
      } catch(err) {
        dispatch({type: 'rejected', payload: 'There was an error loading data'});
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

