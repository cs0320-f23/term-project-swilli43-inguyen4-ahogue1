import { Dispatch, SetStateAction, useEffect, useState } from "react";
import "./styles/suggestions.css";

interface SuggestionsProps {
  currentEntry: string;
  displaySuggestions: boolean;
}

/* The main repl component that contains the shared history state and displays the history and input. */
export default function SuggestionsDisplay(props: SuggestionsProps) {

  document.addEventListener("keydown", (event: KeyboardEvent) => {
    if (event.ctrlKey && event.shiftKey && event.code === "Digit1") {
      document.getElementById("checkbox1")?.click();
    }
    if (
      event.ctrlKey && event.shiftKey &&
      event.code === "Digit2"
    ) {
      document.getElementById("checkbox2")?.click();
    }
    if (
      event.ctrlKey && event.shiftKey &&
      event.code === "Digit3"
    ) {
      document.getElementById("checkbox3")?.click();
    }
  });

  const [suggestions, setSuggestions] = useState<Array<string>>([]);

  useEffect(() => {
    const fetchSuggestions = async () => {
      try {
        console.log("suggestions")
        const link = "http://localhost:3232/getsuggestions?entry=" + props.currentEntry;
        const response = await fetch(link);
        const data = await response.json();
        setSuggestions(data.suggestions || []);
      } catch (error) {
        console.error("Error fetching suggestions:", error);
      }
    };
    fetchSuggestions();
  }, [props.currentEntry]);


  return (
    <div className="suggestions-display" aria-label="suggestions display">
      <h2 className="suggestions-title">Suggestions:</h2>
      <div className="suggestions-content">
        <body>
          <ul className="suggestions-list" aria-label="suggestions list">
            <li>
              <input
                type="checkbox"
                id="checkbox1"
                aria-label="suggestion checkbox 1"
              ></input>
              <label
                id="checkbox1"
                htmlFor="checkbox1"
                aria-label="suggestion 1"
              >
                {suggestions[0]}
              </label>
            </li>
            <li>
              <input
                type="checkbox"
                id="checkbox2"
                aria-label="suggestion checkbox 2"
              ></input>
              <label htmlFor="checkbox2">{suggestions[1]}</label>
            </li>
            <li>
              <input
                type="checkbox"
                id="checkbox3"
                aria-label="suggestion checkbox 3"
              ></input>
              <label htmlFor="checkbox3">{suggestions[2]}</label>
            </li>
          </ul>
        </body>
      </div>
    </div>
  );
}
