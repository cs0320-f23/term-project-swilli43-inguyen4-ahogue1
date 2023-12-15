import { Dispatch, SetStateAction, useEffect, useState } from "react";
import JournalInput from "./JournalInput";
import MockJournalInput from "./MockJournalInput";
import "../styles/journal.css";

/**
 * These are the props for the JournalDisplay component 
 */
interface JournalProps {
  setCurrentEntry: Dispatch<SetStateAction<string>>;
  setDisplaySuggestions: (display: boolean) => void;
  onSubmit: () => void;
  onNext: () => void;
}

/**
 * This component is a wrapper that contains the JournalInput component and allows for 
 * dependecy injection with MockJournalInput for mocked testing.
 * @param props - the interface above containing the arguments to the JournalDisplay
 * @returns - an HTML div representing the journal area, containing the JournalInput component
 */
export default function JournalDisplay(props: JournalProps) {

  document.addEventListener("keydown", (event) => {
    if (event.key === "tab") {
      console.log("event listener was run");
      const textBox = document.querySelector(
        ".journal-command-box"
      ) as HTMLElement;
      if (textBox) {
        textBox.focus();
      }
    }
  });

  return (
    <div className="journal-display" aria-label="journal">
      <JournalInput
        onSubmit={() => {
          props.setDisplaySuggestions(true);
          props.onSubmit();
        }}
        onNext={() => {
          props.setDisplaySuggestions(false);
          props.onNext();
        }}
        setCurrentEntry={props.setCurrentEntry}
      />
    </div>
  );
}
