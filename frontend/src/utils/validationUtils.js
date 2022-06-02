export const ValidateLoginResponse = function (response) {
    if(response.username != null && response.username !== ''){
        return true
    }

    return false;
}