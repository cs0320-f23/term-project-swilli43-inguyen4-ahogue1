import { Dispatch, SetStateAction, useState, useEffect } from "react";
import { ControlledInput } from "./ControlledInput";
import googleLogo from "../assets/google_logo.png";


export default function LoginPage() {
    // gonna want 2 text boxes
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    

    // TODO: I think I should modify this to take in both the username and password
    const handleKeyPress = (
        event: React.KeyboardEvent<HTMLInputElement>,
        username: string,
        password: string
      ) => {
        if (event.key === "Enter") { 
          console.log("enter pressed");
          handleSubmit(email, password);
        }
      };

      async function handleSubmit(email: string, password: string) {
        console.log("logging in " + email);
        // validate data

        // if data is valid, query firebase to log user in

        // if data is invalid, display alert
        // TODO: what if the data is valid (by my standards), but doesn't exist in firebase?
        // ^^ what kind of error will firebase throw? TODO: catch that and display that there
        // is no account with that email info

        // might also need to handle if the username is valid but the password isn't
      }


    

    return (
    <div className="login-page">
    

    <ControlledInput
    value={email}
    setValue={setEmail}
    ariaLabel={"email text box"}
    placeholder="email"
    onKeyPress={(e) => handleKeyPress(e, email, password)} // TODO: do we want a handle keypress here?
    />

    <ControlledInput
    value={password}
    setValue={setPassword}
    ariaLabel={"password text box"}
    placeholder="password"
    onKeyPress={(e) => handleKeyPress(e, email, password)}
    />

    <p> or sign in with </p>
    {/* wrap the google logo in an anchor element to have the image 
        link to firebase auth. TODO: change href to firebase auth 
        from google.com 
    */}
    <a href="https://www.google.com" target="_blank" rel="noopener noreferrer">
        <img src={googleLogo} alt="google logo" className="google-logo"/>
    </a>

    <button className="login-button" onClick={() => handleSubmit(email, password)}>
        Log In
      </button>

    <p>
      Don't have an account?{' '}
      <a href="https://www.gmail.com" className="register-link" aria-label="register link">
        Register
      </a> 
    </p>

    </div>

  );
} 