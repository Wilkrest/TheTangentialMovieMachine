import { useState } from "react";

const SearchButton = function (props) {
    //get the text that will be displayed inside the button
    const buttonName = props.name;
    //get the field that the button will attempt to search with
    const buttonField = props.field;

    const ClickFunction = function () {
        props.updateText(buttonName);
        props.updateMode(buttonField);
    }

    return <button className="button is-primary" name={props.field} onClick={() => ClickFunction()}>{buttonName}</button>
}

//intialize the search buttons with a connection to the search form's state
//this connection will allow for searching via button presses through the buttonFunction prop
const SearchForm = function (props) {
    const [searchText, setSearchText] = useState("First Name");

    const updateText = function (newText) {
        setSearchText(oldText => oldText = newText);
    }

    return (
        <div className="searchFormContainer">
            <h1>Search for movies tangentially connected to my: {searchText}</h1>
            <SearchButton field="first_name" name="First Name" updateMode={props.buttonFunction} updateText={updateText}/>
            <SearchButton field="last_name" name="Last Name" updateMode={props.buttonFunction} updateText={updateText}/>
            <SearchButton field="profile.birthday" name="Birthday" updateMode={props.buttonFunction} updateText={updateText}/>
            <SearchButton field="profile.favorite_color" name="Favorite Color" updateMode={props.buttonFunction} updateText={updateText}/>
        </div>
    )
}

export default SearchForm