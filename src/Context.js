import React, { useContext, useEffect, useState } from "react";
import axios from 'axios';
import { config } from './config';

const REACT_APP_API_KEY = config.REACT_APP_API_KEY;

export const API_URL = `https://www.omdbapi.com/?apikey=${REACT_APP_API_KEY}`;

// Create the context
const AppContext = React.createContext();

// Create the provider component
const AppProvider = ({ children }) => {
    const [isLoading, setLoading] = useState(true);
    const [movies, setMovies] = useState([]); // Change to plural 'movies'
    const [query, setQuery] = useState("titanic");
    const [isError, setError] = useState({
        show: false,
        msg: "",
    });

    // Function to fetch movies
    const getMovies = async (url) => {
        setLoading(true);
        try {
          // console.log("API Key:", REACT_APP_API_KEY);
            console.log("Fetching URL:", url); // Debug log for URL
            const response = await axios.get(url);
            const data = response.data;
            if (data.Response === "True") {
                setMovies(data.Search);
                setError({ 
                    show: false,
                    msg: "",
                });
            } else {
                setError({
                    show: true,
                    msg: data.Error, // Correct the property name
                });
                setMovies([]);
            }
        } catch (error) {
            console.log("Error:", error);
            setError({
                show: true,
                msg: "Failed to fetch data",
            });
            setMovies([]);
        } finally {
            setLoading(false);
        }
    };

    // Fetch movies on component mount
    useEffect(() => {
        const timerOut = setTimeout(() => { // debounce for 500ms
            getMovies(`${API_URL}&s=${query}`);
        }, 500);
        return () => clearTimeout(timerOut);
    }, [query]);

    // Provide the context value
    return (
        <AppContext.Provider value={{ isLoading, movies, isError, query, setQuery }}>
            {children}
        </AppContext.Provider>
    );
};

// Custom hook to consume the context
const useGlobalContext = () => {
    return useContext(AppContext);
};

export { AppContext, AppProvider, useGlobalContext };
