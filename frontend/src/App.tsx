import React, { useEffect, useState } from "react";
import "./styles/App.css";
import JournalDisplay from "./journal/JournalDisplay";
import SuggestionsDisplay from "./SuggestionsDisplay";
import LoginPage from "./journal/LoginPage";

function App() {
  const [currentEntry, setCurrentEntry] = useState<string>(""); 
  const [displaySuggestions, setDisplaySuggestions] = useState<boolean>(false); 

  return (
    <div className="App">
      <div className="App-header">
        <h1 aria-label="title">Journal Buddy</h1>
      </div>
      <LoginPage />

      {/* <div className="Journal">
        <JournalDisplay
          setCurrentEntry={setCurrentEntry}
          setDisplaySuggestions={setDisplaySuggestions}
        /> */}
        {/* <SuggestionsDisplay
          currentEntry={currentEntry}
          displaySuggestions={displaySuggestions}
        />
      </div> */}

    </div>
  );
}

export default App;
