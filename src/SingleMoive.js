
import React, {  useEffect, useState } from "react";

import { API_URL } from './Context'
import { NavLink,useParams } from 'react-router-dom'
const SingleMoive = () => {
  const { id } = useParams();
  const [isLoading, setLoading,setError] = useState(true);
  const [movies, setMovies] = useState([]); // Change to plural 'movies'                // by default titanic

  
  // Function to fetch movies
  const getMovies = async (url) => {
    try {
      const res = await fetch(url);
      const data = await res.json();
      if (data.Response === "True") {
        setLoading(false);
        setMovies(data);
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
    let timerOut = setTimeout(() => {//s means search
      getMovies(`${API_URL}&i=${id}`);
    }, 500)
    return () => clearTimeout(timerOut)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);
  if (isLoading) {
    return (
      <div className="movie-section">
        <div className="loading">Loading...</div>
      </div>
    );
  }

  if (movies.Error) {
    return (
      <div className="movie-section">
        <div className="loading">Error: {movies.Error}</div>
      </div>
    );
  }
  return (
   <>
   <section className="movie-section">
<div className="movie-card">
<figure>
  <img src={movies.Poster} alt="" />
</figure>
          <div className="card-content">
            <p className="title">{movies.Title}</p>
            <p className=""></p>
            <p className="card-text">{movies.Released}</p>
            <p className="card-text">{movies.Genre}</p>
            <p className="card-text">{movies.imdbRating} / 10</p>
            <p className="card-text">{movies.Country}</p>
            </div>
          
          <NavLink to="/" className="back-btn">
            Go Back 
          </NavLink> 
</div>
   </section>
   </>
  )
}

export default SingleMoive
