
// put the submit button here 

import { Dispatch, SetStateAction, useState, useEffect } from "react";
import { ControlledInput } from "../journal/ControlledInput";
import { EntryObject } from "./JournalDisplay";
import { JournalFunction } from "./JournalFunction";
import "../styles/journal.css";
import submit from "../assets/submit.png";
import { EntryInfo } from "./EntryInfo";
import JournalPrompt from "./JournalPrompt";
import PrevButton from "./PrevButton";
import NextButton from "./NextButton";

interface JournalInputProps {
  history: EntryObject[]; // the map of past entries 
  setCurrentEntry: Dispatch<SetStateAction<string>>;
  setDisplaySuggestions: Dispatch<SetStateAction<boolean>>; // the 3 suggestions shown
}

export const previousEntry: JournalFunction = (args: Array<string>) => {
  // TODO: FIX URL for backend
  return fetch("http://localhost:1400/")
    .then((response) => response.json())
    .then((responseObject) => {
      console.log(responseObject);
      if (responseObject.entry !== undefined) {
        const successCommand = new EntryInfo(responseObject.prompt, responseObject.date, responseObject.entry);
        return successCommand;
      } else {
        throw new Error("No journal entry found");
      }
    });
};


/* This displays the text box and associated buttons and ... ? */
export function JournalInput(props: JournalInputProps) {
  // Manages the contents of the input box, object, and csv
  const [entry, setEntry] = useState<string>("");
  
  /**
   * allows user to press enter instead of clicking submit
   * @param event a keyboard press
   * @param command the input string
   */
  const handleKeyPress = (
    event: React.KeyboardEvent<HTMLInputElement>,
    entry: string
  ) => {
    if (event.key === "Enter") {
      console.log("enter pressed");
      handleSubmit(entry);
      // scrollHistoryToBottom();
    }
  };

  // saves entry to back end, called when user input changes
  function autosave(entry: string) {
    // send the entry to the back end
    // backend.post ... ?
  }
  
  // This function is triggered when the button is clicked. Triggers the 
  // populating of suggestions. Sets the current journal entry so that 
  // SuggestionsDisplay can access it
  async function handleSubmit(entry: string) {
    props.setDisplaySuggestions(true)
    props.setCurrentEntry(entry)
  }

  // handlePrev triggers call to get previous journal entry and passes it to 
  // ControlledInput to re-populate input box with this previous journal entry
  async function handlePrev() {
    props.setDisplaySuggestions(false)
    // TODO: call the backend to get user-specfic past journal entries
    // var prevEntry = 
    // setEntry()
  }

  
  
  async function handleNext() {
    props.setDisplaySuggestions(false)

  }

  /* returns component to user: the input box, sets logic for submtting a command on submit button */
  return (
    <div
      className="journal-input"
      aria-label="Journal input"
      aria-description="Journal input box"
    >
      <JournalPrompt />

      <ControlledInput
        value={entry}
        setValue={setEntry}
        ariaLabel={"Journal entry"}
        placeholder="Enter response here..."
        onKeyPress={(e) => handleKeyPress(e, entry)}
        // onInput={(e) => autosave(entry)}
      />
      <div className="button-area">
        <div className="prev-next-menu">
          <button className="prev-button" onClick={() => handlePrev()}>
            <PrevButton />
            prev
          </button>
          <button className="next-button" onClick={() => handleNext()}>
            <NextButton />
            next
          </button>
        </div>
        <button className="submit-button" onClick={() => handleSubmit(entry)}>
          <p className="submit-text">submit for suggestions</p>
          <a target="_blank" rel="noopener noreferrer">
            <img src={submit} alt="submit" className="submit-arrows" />
          </a>
        </button>
      </div>
    </div>
  );
}
