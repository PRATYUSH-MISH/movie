import React, { useContext, useEffect, useState } from "react";
import {config}from './config'
const REACT_APP_API_KEY = config.REACT_APP_API_KEY

export const API_URL = `http://www.omdbapi.com/?apikey=${REACT_APP_API_KEY}`;


// Create the context
const AppContext = React.createContext();

// Create the provider component
const AppProvider = ({ children }) => {
    const [isLoading, setLoading] = useState(true);
    const [movies, setMovies] = useState([]); // Change to plural 'movies'                // by default titanic
    const [query,setQuery]=useState("titanic")
    const [isError, setError] = useState({
        show: false,
        msg: ""
    });

    // Function to fetch movies
    const getMovies = async (url) => {
        setLoading(true)
        try {
            const res = await fetch(url);
            const data = await res.json();
            if (data.Response === "True") {
                setLoading(false);
                setMovies(data.Search);
            } else {
                setError({
                    show: true,
                    msg: data.Error // Correct the property name
                });
            }
        } catch (error) {
            console.log(error);
        }
    };

    // Fetch movies on component mount
    useEffect(() => {//debounce
      let timerOut=  setTimeout(()=>{//s means search
          getMovies(`${API_URL}&s=${query}`);
      },500)
       return ()=> clearTimeout(timerOut)
      // getMovies(API_URL);
    }, [query]);

    // Provide the context value
    return (
        <AppContext.Provider value={{ isLoading, movies, isError ,query,setQuery}}>
            {children}
        </AppContext.Provider>
    );
};

// Custom hook to consume the context
const useGlobalContext = () => {
    return useContext(AppContext);
};

export { AppContext, AppProvider, useGlobalContext };
 