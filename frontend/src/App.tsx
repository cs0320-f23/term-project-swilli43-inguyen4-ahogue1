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
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false); // Track submit state

  document.addEventListener("keydown", (event: KeyboardEvent) => {
    if (event.code == "ControlRight" || event.code == "ControlLeft") {
      document.getElementById("journal-command-box")?.focus();
    } else if (event.code == "AltRight" || event.code == "AltLeft") {
      document.getElementById("submit-button")?.focus();
      document.getElementById("login-button")?.focus();
    } 
  });

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (
        event.key === "Enter" &&
        document.activeElement?.id === "submit-button"
      ) {
        handleSubmit();
      }
    };

    document.addEventListener("keydown", handleKeyPress);

    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, []);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

   const handleSubmit = () => {
     setIsSubmitted(true);
   };

  const renderPage = () => {
    if (isLoggedIn) {
      return (
        <div className="journal-container">
          <JournalDisplay
            setCurrentEntry={setCurrentEntry}
            setDisplaySuggestions={setDisplaySuggestions}
            onSubmit={handleSubmit}
          />
          {isSubmitted && (
            <SuggestionsDisplay
              currentEntry={currentEntry}
              displaySuggestions={displaySuggestions}
            />
          )}
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
