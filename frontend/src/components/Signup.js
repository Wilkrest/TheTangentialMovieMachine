//packages
import { useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { StringsMatch } from "../utils/stringUtils";

//components
import FormField from "./FormField";

//utils
import {LoginUser} from '../utils/userUtils'

function SignupForm(props){
    //use hooks to maintain the login function component state
    //the hooks will be used to manage the login form data
    const [formData, setForm] = useState({});

    //get hook to navigate
    const navigate = useNavigate();

    const RequestSignup = function (e) {
        e.preventDefault()

        //validate new passwords match
        if(StringsMatch(formData.password, formData.passwordValidator)){
            
            //create payload for endpoint 
            const signupPayload = {
                username: formData.username,
                password: formData.password,
                first_name: formData.first_name,
                last_name: formData.last_name,
                profile: {
                    birthday: formData.birthday,
                    favorite_color: formData.favorite_color
                }
            };

            axios({
                method: 'post',
                url: 'http://localhost:8000/api/users/',
                data: signupPayload
            }).then((response) => {
                //checking for valid http status and data type
                if(response.status === 201){
                    const userData = response.data;

                    //log user into a session
                    LoginUser(userData);

                    props.loginFunction();

                    //go to home page
                    navigate("/search", {replace: true});
                }
                else{
                    alert("Incorrect response received from server, please try again");
                }
            }).catch((err) => {
                const status = err.response.status;

                if(status === 401){
                    alert("Incorrect Username or Password, please try again");
                }
                else{
                    alert(err.message);
                }
            });
        }
        else{
            alert("Passwords do not match");
        }
    }

    const navigateToLogin = function () {
        navigate('/login', {replace: true})
    }

    return (
        <div className="loginContainer">
            <h1>Create an account and fill in some tangential information</h1>
            <div className="loginForm">
                <form onSubmit={RequestSignup}>
                    <FormField label="Username" type="text" name="username" required={true} formData={formData} updateFormData={setForm}/>
                    <FormField label="Password" type="password" name="password" required={true} formData={formData} updateFormData={setForm}/>
                    <FormField label="Re-Enter Password" type="password" name="passwordValidator" required={true} formData={formData} updateFormData={setForm}/>
                    <FormField label="First Name" type="text" name="first_name" required={true} formData={formData} updateFormData={setForm}/>
                    <FormField label="Last Name" type="text" name="last_name" required={true} formData={formData} updateFormData={setForm}/>
                    <FormField label="Birthday" type="date" name="birthday" required={true} formData={formData} updateFormData={setForm}/>
                    <FormField label="Favorite Color" type="text" name="favorite_color" required={true} formData={formData} updateFormData={setForm}/>

                    <div className="button-container">
                        <input className="button is-small is-link"type="submit" name="Sign Up" />
                    </div>
                    <div className="button-container">
                        <div className="loginPageLink" onClick={navigateToLogin}> Return to login </div>
                    </div>
                    
                </form>
            </div>
        </div>
        
    );
}

export default SignupForm;