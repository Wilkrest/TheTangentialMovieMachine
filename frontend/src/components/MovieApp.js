import React, { useState, useEffect } from 'react';
import MovieRow from './MovieRow.js';
import $ from 'jquery';
import { GetDayFromDate, IsDate } from '../utils/stringUtils.js';

const MovieApp = function (props) {
  const [state, setState] = useState("")

  useEffect(() => {
      let searchTerm = props.searchTerm;

          if(IsDate(searchTerm)){
          const day = GetDayFromDate(searchTerm)
          searchTerm = day;
      }

      PerformSearch(searchTerm)
  }, [props.searchTerm])

  //this function executes the search on movieDB and returns the results
  const PerformSearch = function (searchTerm) {
    //if the search term is empty then just clear the result table and return
    if(searchTerm === ""){
        setState({rows: []});
        return;
    }

    //jquery has a function called ajax used to make asynchronous calls to fetch data
    const urlString = "https://api.themoviedb.org/3/search/movie?api_key=98350ecd42c9cc6f0c3ca343d790f8e9&query=" + searchTerm;
    $.ajax({
      //holds the url to fetch data from 
      url: urlString,
      //callback function executed on success
      //searchResults is the fetched data, which should be in the form of an array of JSON objects
      success: (searchResults) => {
        //save the fetched data into results, results will now be an array of objects
        const results = searchResults.results;
        //initalize array to contain the constructed movie row components
        const movieRows = [];

        //parse through the fetched JSON array building MovieRow components with each element in the fetched array
        results.forEach((movie) => {
          //construct the new MovieRow component with each 'movie' in the results array
          const newMovie = <MovieRow key={movie.id} movie={movie} />;
          movieRows.push(newMovie);
        })

        //set the current state, ie add the newly created movie row components to the movie app
        setState({rows: movieRows});
      },
      //callback function excecuted on error
      error: (xhr, status, err) => {
        alert(err)
      }
    })
  }

    return (
        <div className="App">
          <div className='searchBarContainer'>
            <input id="movieSearchBar" className="main-search-bar" onChange={(e) => PerformSearch(e.target.value)} placeholder="Enter movie title..."></input>
          </div>
          {state.rows}    
        </div>
    )
}

export default MovieApp;