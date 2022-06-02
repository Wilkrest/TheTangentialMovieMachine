import React, { useState } from 'react'
import { Routes, Route, Navigate } from "react-router-dom";
import FavoritesList from './components/FavoritesList';
import LoginForm from './components/Login';
import SignupForm from './components/Signup'; 
import SearchPage from './components/SearchPage';
import { GetUserData } from './utils/userUtils';
import 'bulma/css/bulma.min.css';

export const App = function () {  
  //initialize state and update state function
  const [userStateData, setUserData] = useState("");

  //this will get passed to components which log a user in
  const LoginUser = function () {
    setUserData(currentUserData => currentUserData = GetUserData())
  }

  //this will get passed to components that can log a user out
  const LogoutUser = function () {
    setUserData(currentUserData => currentUserData = "")
  }
  
  return (
    <div className="App">
        <Routes>
          <Route path="" element={<Navigate to="search"/>}></Route>
          <Route path="search" element={<SearchPage userData={userStateData} logoutFunction={LogoutUser}/>}></Route>
          <Route path="favorites" element={<FavoritesList userData={userStateData} logoutFunction={LogoutUser}/>}></Route>
          <Route path="login" element={<LoginForm loginFunction={LoginUser}/>}></Route>
          <Route path="signup" element={<SignupForm loginFunction={LoginUser}/>}></Route>
        </Routes>    
    </div>
  )
}

export default App