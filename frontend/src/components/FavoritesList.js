import axios from "axios";
import { useEffect, useState } from "react";
import Navbar from "./Navbar";

const FavoriteEntry = function (props) {
    return (
        <div className="favoriteEntry" key={props.name}> 
            <h4>{props.name}</h4>
            <p>{props.description}</p>
            <p>{props.release_date}</p>
        </div>
    )
}

const FavoritesList = function (props) {
    const [entries, setEntries] = useState([]);

    //only update favorite movies list when the href changes
    useEffect(() => {
        //this request should include a user ID to filter the list of favorite movies to only show the current user's
        // const userData = GetUserData();
        axios({
            method: 'get',
            url: 'http://localhost:8000/api/favoritemovies/'
        }).then((response) => {
            const favorites = response.data;

            //initiate array to hold all new entry components
            const newRows = [];

            //build favorite entry components for every returned record
            for(let i = 0; i < favorites.length; i++){
                const movie = favorites[i];
                const newEntry = <FavoriteEntry name={movie.name} description={movie.description} release_date={movie.release_date} key={movie.id}/>
                newRows.push(newEntry);
            }

            //attach the new entries to the list component
            setEntries({rows: newRows});
        }).catch((err) => {
            alert(err)
        });
    }, [window.location.href])

    return <>
        <Navbar/>
        <div className="favoritesList">
            <h1>{props.userData.first_name}'s Tangential Favorites</h1>
            {entries.rows}
        </div>
    </>    
}

export default FavoritesList;