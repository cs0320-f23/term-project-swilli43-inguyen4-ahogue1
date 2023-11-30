import { Dispatch, SetStateAction, useState } from "react";

interface SuggestionsProps {
  currentEntry: string;
  displaySuggestions: boolean;
}

/* The main repl component that contains the shared history state and displays the history and input. */
export default function SuggestionsDisplay(props: SuggestionsProps) {
  
  return (
    <div className="SuggestionsDisplay" aria-label="suggestions display">
      <p>Suggestions</p>
    </div>
  );
}
