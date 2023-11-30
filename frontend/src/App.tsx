import React, { useEffect, useState } from "react";
import "./styles/App.css";
import JournalDisplay from "./journal/JournalDisplay";
import SuggestionsDisplay from "./SuggestionsDisplay";

function App() {
  const [currentEntry, setCurrentEntry] = useState<string>(""); 
  const [displaySuggestions, setDisplaySuggestions] = useState<boolean>(false); 

  return (
    <div className="App">
      <div className="Journal">
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
