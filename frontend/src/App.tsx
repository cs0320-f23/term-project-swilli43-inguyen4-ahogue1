import React, { useEffect, useState } from "react";
import "./styles/App.css";
import JournalDisplay from "./journal/JournalDisplay";
import SuggestionsDisplay from "./SuggestionsDisplay";
import LoginPage from "./LoginPage";
import RegisterPage from "./RegisterPage";
import profile from "./assets/profile.png";

function App() {
  const [currentEntry, setCurrentEntry] = useState<string>("");
  const [displaySuggestions, setDisplaySuggestions] = useState<boolean>(false);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false); // Track login state

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const renderPage = () => {
    if (isLoggedIn) {
      return (
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
      );
    } else {
      return (
        <LoginPage
          onLogin={() => {
            handleLogin();
          }}
        />
      );
    }
  };

  return (
    <div className="App">
      <div className="App-header">
        <h1 className="header-text" aria-label="title">
          Journal Buddy
        </h1>
        <a href="" target="_blank" rel="noopener noreferrer">
          <img src={profile} alt="profile" className="profile" />
        </a>
      </div>

      {renderPage()}

      {/* <RegisterPage /> */}
    </div>
  );
}

export default App;
