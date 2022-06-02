//packages
import {useState} from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

//components
import FormField from "./FormField";

//utils and services
import {LoginUser} from '../utils/userUtils'
import { ValidateLoginResponse } from "../utils/validationUtils";
import DOMPurify from "dompurify";

function LoginForm(props){
    //use hooks to maintain the login function component state
    //the hooks will be used to manage the login form data
    const [loginForm, setForm] = useState({});

    //get hook to navigate
    const navigate = useNavigate();

    const RequestLogin = function (e) {
        e.preventDefault()

        //sanitize login data before sending to server
        const cleanUsername = DOMPurify.sanitize(loginForm.username);
        const cleanPassword = DOMPurify.sanitize(loginForm.password);

        const loginPayload = {
            username: cleanUsername,
            password: cleanPassword
        }

        axios({
            method: 'post',
            url: 'http://localhost:8000/api/login/',
            data: loginPayload,
            headers: {
                'Content-Type': 'application/json',
            }
        }).then((response) => {
            //checking for valid http status and data type
            if(ValidateLoginResponse(response.data) && response.status === 200){
                //log user into a session
                LoginUser(response.data);

                //set state data for the app
                props.loginFunction();

                //go to home page
                navigate("/search", {replace: true});
            }
            else{
                alert("Incorrect response received from server, please try again");
            }
        }).catch((err) => {
            console.log(err)
            const status = err.response.status;

            if(status === 401){
                alert("Incorrect Username or Password, please try again");
            }
            else{
                alert(err.message);
            }
        });
    }

    //use this function to navigate to sign up form
    const signupform = function () {
        navigate("/signup", {replace: true})
    }

    return (
        <div className="loginContainer">
            <h1>The Tangential Movie Machine</h1>
            <div className="loginForm">
                <form onSubmit={RequestLogin}>
                    <FormField label="Username" type="text" name="username" required={true} formData={loginForm} updateFormData={setForm}/>
                    <FormField label="Password" type="password" name="password" required={true} formData={loginForm} updateFormData={setForm}/>
                    <div className="button-container">
                        <input class="button is-small is-link"type="submit" name="Log in" />
                    </div>
                    <div className="button-container">
                        <div className="loginPageLink" onClick={signupform}>Sign Up</div>
                    </div>
                </form>
            </div>
        </div>
        
    );
}

export default LoginForm;