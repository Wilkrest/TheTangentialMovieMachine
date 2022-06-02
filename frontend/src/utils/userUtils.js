export const GetUserData = function () {
    const userData = JSON.parse(sessionStorage.getItem("user_data"));

    return userData;
}

//this function returns bool for if user is logged in
export const UserAuthStatus = function () {
    //check if user is logged in
    const userData = GetUserData();

    if(userData != null){
        return true;
    }

    return false;
}

//just saving a user ID in session storage to maintain user authorization information
//but a much more valid method would be to store an httponly cookie containing a jwt for authentication 
export const LoginUser = function (userData) {
    const userDataString = JSON.stringify(userData);
    sessionStorage.setItem("user_data", userDataString);
}

export const LogoutUser = function (){
    sessionStorage.clear();
}