import { Dispatch, SetStateAction, useState, useEffect } from "react";
import { ControlledInput } from "./ControlledInput";
import googleLogo from "../assets/google_logo.png";


export default function LoginPage() {
    // gonna want 2 text boxes
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    

    // TODO: I think I should modify this to take in both the username and password
    const handleKeyPress = (
        event: React.KeyboardEvent<HTMLInputElement>,
        username: string,
        password: string
      ) => {
        if (event.key === "Enter") { 
          console.log("enter pressed");
        //   handleSubmit(text);
        }
      };


    

    return (
    <div className="login-page">
    

    <ControlledInput
    value={username}
    setValue={setUsername}
    ariaLabel={"username text box"}
    placeholder="username"
    onKeyPress={(e) => handleKeyPress(e, username, password)} // TODO: do we want a handle keypress here?
    />

    <ControlledInput
    value={password}
    setValue={setPassword}
    ariaLabel={"password text box"}
    placeholder="password"
    onKeyPress={(e) => handleKeyPress(e, username, password)}
    />

    <p> or sign in with </p>
    {/* wrap the google logo in an anchor element to have the image 
        link to firebase auth. TODO: change href to firebase auth 
        from google.com 
    */}
    <a href="https://www.google.com" target="_blank" rel="noopener noreferrer">
        <img src={googleLogo} alt="google logo" className="google-logo"/>
    </a>
    <p>
      Don't have an account?{' '}
      <a href="https://www.gmail.com" className="register-link" aria-label="register link">
        Register
      </a> 
    </p>

    </div>

  );
} 