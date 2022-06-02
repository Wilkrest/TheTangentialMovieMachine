import Navbar from "./Navbar";
import SearchForm from "./SearchForm";
import React, {useState, useEffect} from "react";
import MovieApp from "./MovieApp";
import { GetUserData } from "../utils/userUtils";
import { GetPropByString } from "../utils/stringUtils";

//the search page takes user data as a prop in order to create movie queries 
//according to the button clicked in the SearchForm component
const SearchPage = function (props) {
    //initialize state for the search page
    const [searchMode, setSearchMode] = useState("first_name");
    const [searchTerm, setSearchTerm] = useState("");
    
    const UpdateSearchMode = function (newMode) {
        setSearchMode(oldMode => oldMode = newMode);
    }

    const userData = props.userData;

    //run a search based on the new search mode, this happens on every search mode change via the useEffect hook
    useEffect(() => {
        //using user data from session storage to persist through reloads
        const storedUserData = GetUserData();

        if(storedUserData != null){
            const searchValue = GetPropByString(storedUserData, searchMode); 
            setSearchTerm(oldTerm => oldTerm = searchValue);
            document.getElementById("movieSearchBar").value = searchValue;
        }
    }, [searchMode, userData])
    
    return (
        <>
            <Navbar/>
            <SearchForm userData={props.userData} buttonFunction={UpdateSearchMode} searchMode={searchMode}/>
            <MovieApp searchTerm={searchTerm}/>
        </>
    )
}

export default SearchPage;