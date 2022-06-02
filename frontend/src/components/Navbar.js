//this file contains the logic for using the navbar to traverse the app
import { Navigate, useNavigate } from "react-router-dom";
import React from 'react';
import { UserAuthStatus, LogoutUser } from '../utils/userUtils.js';

//uses name prop to display the name of the button on the navbar and to also navigate by changing the url when clicked
const NavButton = function (props) {
    //hook to use the react router navigate
    const navigate = useNavigate();

    //get the name of the button being created
    const name = props.name;

    //this function returns either a navigational function or a logout function depending on the provided prop name
    //the returned function is then passed to the created component returned by this function component
    const navButtonClick = (() => {
        if(name !== "Logout"){
            return () => {
                const href = "/" + name.toLowerCase();
                navigate(href, {replace: true});
            };
        }
        else{
            return () => {
                LogoutUser();
                navigate("/login", {replace: true});
            }
        }
    })();

    return <div id={props.name + "NavButton"} className="navButton button is-dark" onClick={navButtonClick}>{props.name}</div>;
}

const Navbar = function () {
    //if the user is not authenticated then go to login screen
    if(!UserAuthStatus()){
        return (
            <Navigate replace={true} to="/login"/>
        )
    }

    return (
        <div className="navbarContainer">
            <h1>The Tangential Movie Machine</h1>
            <div className="topNavbar">
                <NavButton name="Search"/>
                <NavButton name="Favorites"/>
                <NavButton name="Logout"/>
            </div>
        </div>
    );
}
 
export default Navbar;