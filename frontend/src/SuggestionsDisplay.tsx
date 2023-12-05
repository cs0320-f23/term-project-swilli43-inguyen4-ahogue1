import { Dispatch, SetStateAction, useState } from "react";
import "./styles/suggestions.css";
import Disclaimers from "./Disclaimers";


interface SuggestionsProps {
  currentEntry: string;
  displaySuggestions: boolean;
}

/* The main repl component that contains the shared history state and displays the history and input. */
export default function SuggestionsDisplay(props: SuggestionsProps) {
  
  return (
    <div className="suggestions-display" aria-label="suggestions display">
      <h2 className="suggestions-title">Suggestions:</h2>
      <div className="suggestions-content"></div>
      <div className="disclaimer-message">
        <Disclaimers />
      </div>
    </div>
  );
}
