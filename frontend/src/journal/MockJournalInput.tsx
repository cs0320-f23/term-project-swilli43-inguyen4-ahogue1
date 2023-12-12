
// put the submit button here 

import { Dispatch, SetStateAction, useState, useEffect } from "react";
import { ControlledInput } from "./ControlledInput";
import { JournalFunction } from "./JournalFunction";
import "../styles/journal.css";
import submit from "../assets/submit.png";
import { EntryInfo } from "./EntryInfo";
import JournalPrompt from "./JournalPrompt";
import PrevButton from "./PrevButton";
import NextButton from "./NextButton";
import {
  mockPrompt1,
  mockPrompt2,
  mockPrompt3,
  mockDate,
  mockEntry,
  mockEntry2,
  mockEntryInfo1,
  mockEntryInfo2,
  mockBackend
} from "../../tests/mocks/mockedData";

interface JournalInputProps {
  onSubmit: () => void;
  // history: EntryInfo[]; // the map of past entries
  setCurrentEntry: Dispatch<SetStateAction<string>>;
  //setDisplaySuggestions: Dispatch<SetStateAction<boolean>>; // the 3 suggestions shown
}

/* This displays the text box and associated buttons and ... ? */
export default function MockJournalInput(props: JournalInputProps) {
  // Manages the contents of the input box, object, and csv
  const [entry, setEntry] = useState<string>("");
  const [prompt, setPrompt] = useState<string>("");
  const [date, setDate] = useState<string>("");

  /* fetch the prompt when the page is started */
function mockFetchPrompt(): string {
    return mockPrompt1;
  }

function mockFetchDate(): string {
  return mockDate;
}

  /* on page initialization, get & display the prompt and the date */
  useEffect(() => {
    const mockFetchedPrompt = mockFetchPrompt();
    const mockFetchedDate = mockFetchDate();
    setPrompt(mockFetchedPrompt);
    setDate(mockFetchedDate);
    // if (typeof(mockFetchedPrompt) === "string") {
    //   setPrompt(mockFetchedPrompt);
    // } else {
    //   alert("error loading mock prompt");
    // }

    // if (typeof(mockFetchedDate) === "string") {
    //   setDate(mockFetchedDate);
    // } else {
    //   alert("error loading mock date");
    // }
  });

  function errorDisplay(message: string) {
    const errorDisplay = document.getElementById('error-display'); 
    if (errorDisplay) {
      errorDisplay.innerText = `Error: ${message}`;
      errorDisplay.style.display = 'block';
    } else {
      console.error("Error display message not found.")
    }
  }
  
  const mockPreviousEntry : any = (args: Array<string>) => {

    setPrompt(mockPrompt2); // TODO: how to fix these?
    setEntry(mockEntry);
    setDate(mockDate);
  
    return mockEntryInfo1;
  }

  const mockNextEntry: any = (args: Array<string>) => {

    setPrompt(mockPrompt3); // TODO: how to fix these?
    setEntry(mockEntry2);
    setDate(mockDate);
  
    return mockEntryInfo2;
  }

  
  const handleClick = () => {
    console.log("Submit button clicked");
    props.setCurrentEntry(entry);
    props.onSubmit();
  };
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
      // handleSubmit(entry);
      // scrollHistoryToBottom();
    }
  };

  function mockAutoSave() {
    mockBackend.push(mockEntryInfo1); // for if you import mockBackend from mockedData
    return mockBackend; // then, check if the entry to save exists in the backend
    // or, pass the backend array in as a parameter, run the autosave function,
    // then check if the mocked entry exists in the array
  }
  
  // This function is triggered when the button is clicked. Triggers the 
  // populating of suggestions. Sets the current journal entry so that 
  // SuggestionsDisplay can access it
  // async function handleSubmit(entry: string) {
  //   props.setDisplaySuggestions(true)
  //   props.setCurrentEntry(entry)
  // }

  // handlePrev triggers call to get previous journal entry and passes it to 
  // ControlledInput to re-populate input box with this previous journal entry

  
  
  // async function handleNext() {
  //   props.setDisplaySuggestions(false)

  // }

  /* returns component to user: the input box, sets logic for submtting a command on submit button */
  return (
    <div
      className="journal-input"
      aria-label="Journal input"
      aria-description="Journal input box"
    >
      <JournalPrompt 
        prompt = { prompt }
        date = { date }
      />

      {/* <div className="error-display" id="error-display">
        <p id="error-message">Error: Failed request to the backend server. Please ensure that the backend is running on the expected port (3232).</p>
        <button>Close</button>
      </div> */}

      <ControlledInput
        value={entry}
        setValue={setEntry}
        ariaLabel="journal command box"
        placeholder="Enter response here..."
        onKeyPress={(e) => handleKeyPress(e, entry)}
        onInput={(e) => mockAutoSave()}
      />
      <div className="button-area">
        <div className="prev-next-menu">
          <button className="prev-button" onClick={() => mockPreviousEntry}>
            <PrevButton />
            prev
          </button>
          <button className="next-button" onClick={() => mockNextEntry}>
            <NextButton />
            next
          </button>
        </div>
        <button
          className="submit-button"
          aria-label="submit button"
          id="submit-button"
          onClick={handleClick}
        >
          <p className="submit-text">submit for suggestions</p>
          <a target="_blank" rel="noopener noreferrer">
            <img src={submit} alt="submit" className="submit-arrows" />
          </a>
        </button>
      </div>
    </div>
  );
}
