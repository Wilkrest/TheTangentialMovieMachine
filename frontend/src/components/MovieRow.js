import axios from 'axios';
import React from 'react';
import { GetUserData } from '../utils/userUtils';

const MovieRow = function (props) {
    const movie = props.movie;

    const SaveMovie = function () {
        const userData = GetUserData();

        const newSavedMovie = {
            name: movie.title,
            description: movie.overview,
            release_date: movie.release_date,
            movie_db_id: movie.id,
            user_id: userData.id
        }

        axios({
            method: 'post',
            url: 'http://localhost:8000/api/favoritemovies/',
            data: newSavedMovie
        }).then((response) => {

        }).catch((err) => {
            alert(err)
        });

        return;
    }

    //if the movie does not have a valid poster then do not render anything
    //also do not render adult films
    if(movie.poster_path == null || movie.adult === true){
        return null;
    }

    const posterURL = 'https://image.tmdb.org/t/p/w185/' + movie.poster_path;

    return <table className="movie-row-container" key={movie.id} >
    <tbody className="movie-body"> 
        <tr className="movie-row">
            <td className="movie-poster">
                <img alt="poster" width="120" src={posterURL}/>
            </td>
            <td className="movie-details">
                <h3>{props.movie.title}</h3>
                <p>{props.movie.overview}</p>
                <input type="button" className="save-button button is-small is-primary is-outlined" onClick={() => SaveMovie()} value="Save"></input>
            </td>
        </tr>
    </tbody>
     </table>
}

export default MovieRow;