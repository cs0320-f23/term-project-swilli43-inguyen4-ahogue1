import React, { useEffect, useState } from "react";
import "./styles/App.css";
import JournalDisplay from "./journal/JournalDisplay";
import SuggestionsDisplay from "./SuggestionsDisplay";
import LoginPage from "./journal/LoginPage";
import RegisterPage from "./journal/RegisterPage";
import profile from "./assets/profile.png";

function App() {
  const [currentEntry, setCurrentEntry] = useState<string>(""); 
  const [displaySuggestions, setDisplaySuggestions] = useState<boolean>(false); 

  return (
    <div className="App">
      <div className="App-header">
        <h1 className="header-text" aria-label="title">
          Journal Buddy
        </h1>
        <a
          href=""
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src={profile} alt="profile" className="profile" />
        </a>
      </div>
      {/* <LoginPage /> */}
      {/* <RegisterPage /> */}

      <div className="journal-container">
        <JournalDisplay
          setCurrentEntry={setCurrentEntry}
          setDisplaySuggestions={setDisplaySuggestions}
        />
        <SuggestionsDisplay
          currentEntry={currentEntry}
          displaySuggestions={displaySuggestions}
        />
      </div>
    </div>
  );
}

export default App;
