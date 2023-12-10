import { Dispatch, SetStateAction, useState } from "react";
import "./styles/suggestions.css";
import Disclaimers from "./Disclaimers";
import rectangle from "./assets/rectangle.png";


interface SuggestionsProps {
  currentEntry: string;
  displaySuggestions: boolean;
}

/* The main repl component that contains the shared history state and displays the history and input. */
export default function SuggestionsDisplay(props: SuggestionsProps) {
  return (
    <div className="suggestions-display" aria-label="suggestions display">
      <h2 className="suggestions-title">Suggestions:</h2>
      <div className="suggestions-content">
        <body>
          <ul className="suggestions-list" aria-label="suggestions list">
            <li>
              <input type="checkbox" id="checkbox1"></input>
              <label htmlFor="checkbox1">suggestion 1</label>
            </li>
            <hr className="list-division"></hr>
            <li>
              <input type="checkbox" id="checkbox2"></input>
              <label htmlFor="checkbox2">suggestion 2</label>
            </li>
            <hr className="list-division"></hr>
            <li>
              <input type="checkbox" id="checkbox3"></input>
              <label htmlFor="checkbox3">suggestion 3</label>
            </li>
          </ul>
        </body>
      </div>
      <div className="disclaimer-message" aria-label="mental health disclaimer">
        <Disclaimers />
      </div>
    </div>
  );
}
