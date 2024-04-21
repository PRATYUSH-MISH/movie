import React from 'react';
import { useGlobalContext } from './Context';
import { NavLink } from "react-router-dom";

const Movies = () => {
  const { movies } = useGlobalContext(); // Corrected to 'movies'

  return (
    <section className='movie-page'>
      <div className=' container grid grid-4-col'>
        {movies && movies.map((curMovie) => {
          const { imdbID, Title, Poster } = curMovie;
const moviename =Title.substring(0,15);
          return (
            <NavLink key={imdbID} to={`movie/${imdbID}`} >
              <div className='card'>
                <div className='card-info'>
                  <h2>{moviename.length>=15?`${moviename}...`:moviename}</h2>
                  <img src={Poster} alt={imdbID} />
                </div>
              </div>
            </NavLink>
          );
        })}
      </div>
    </section>
  );
};

export default Movies;
