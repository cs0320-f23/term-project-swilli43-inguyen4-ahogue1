
// put the submit button here 

import { Dispatch, SetStateAction, useState, useEffect } from "react";
import { ControlledInput } from "../journal/ControlledInput";
import { JournalFunction } from "./JournalFunction";
import "../styles/journal.css";
import submit from "../assets/submit.png";
import { EntryInfo } from "./EntryInfo";
import JournalPrompt from "./JournalPrompt";
import PrevButton from "./PrevButton";
import NextButton from "./NextButton";

interface JournalInputProps {
  onSubmit: () => void;
  // history: EntryInfo[]; // the map of past entries
  setCurrentEntry: Dispatch<SetStateAction<string>>;
  //setDisplaySuggestions: Dispatch<SetStateAction<boolean>>; // the 3 suggestions shown
}

/* This displays the text box and associated buttons and ... ? */
export default function JournalInput(props: JournalInputProps) {
  // Manages the contents of the input box, object, and csv
  const [entry, setEntry] = useState<string>("");
  const [prompt, setPrompt] = useState<string>("");
  const [date, setDate] = useState<string>("");

  /* fetch the prompt when the page is started */
  async function fetchPrompt(): Promise<string | undefined> {
    const link =  "http://localhost:3232/getprompt";
    return fetch(link)
      .then((response) => response.json())
      .then((responseObject) => {
        return responseObject.prompt;
      });
  }
  
  /* fetch the current date when the page is started*/
  async function fetchDate(): Promise<string | undefined> {
    const link =  "http://localhost:3232/getdate"; // TODO: add this as a backend handler
    return fetch(link)
      .then((response) => response.json())
      .then((responseObject) => {
        return responseObject.date; // TODO: make sure this is a field in the response map
      });
  }
    

  /* on page initialization, get & display the prompt and the date */
  useEffect(() => {
    const fetchPromptData = async () => {
      const fetchedprompt = await fetchPrompt();

      if (typeof(fetchedprompt) === "string") {
        setPrompt(fetchedprompt);
      } else {
        alert("Error loading prompt; please refesh page");
      }

    }
    const fetchDateData = async () => {
      const fetcheddate = await fetchDate();

      if (typeof(fetcheddate) === "string") {
        setDate(fetcheddate);
      } else {
        alert("Error loading date; please refesh pag");
      }
    } 
    fetchDateData();
    fetchPromptData();
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
  
  const previousEntry: JournalFunction = (args: Array<string>) => {
    const errorDisplay = document.getElementById('error-display');
    return fetch("http://localhost:3232/getprev")
      .then((response) => response.json())
      .then((responseObject) => {
        console.log(responseObject);
        if (responseObject.result == "success") {
          const successEntry = new EntryInfo(responseObject.journal_prompt, 
            responseObject.journal_date, responseObject.journal_entry);
            setPrompt(responseObject.journal_prompt);
            setEntry(responseObject.journal_entry);
            setDate(responseObject.journal_date);
          return successEntry;
        } else {
          console.log("error thrown: " + responseObject.error_msg);
          throw new Error(responseObject.error_msg);
        }
      }).catch((error) => {
        // Handle the error and display the message on the screen
        console.error("Error: Failed request to the backend server. Please ensure that the backend is running on the expected port (3232).");
        if (errorDisplay) {
          errorDisplay.innerText = `Error: ${error.message}`;
        }
        throw new Error("Error: Failed request to the backend server. Please ensure that the backend is running on the expected port (3232).");
      });
  };

  const nextEntry: JournalFunction = (args: Array<string>) => {
    return fetch("http://localhost:3232/getnext")
      .then((response) => response.json())
      .then((responseObject) => {
        console.log(responseObject);
        const successEntry = new EntryInfo(responseObject.journal_prompt, 
          responseObject.journal_date, responseObject.journal_entry);
          setPrompt(responseObject.journal_prompt);
          setEntry(responseObject.journal_entry);
          setDate(responseObject.journal_date);
        return successEntry;
      });
  };



  
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

  // saves entry to back end, called when user input changes
  function autosave() {
    // send the entry to the back end
    // backend.post ... ?
    fetch("http://localhost:3232/updateEntry?entry=" + {entry} + "&prompt=" + {prompt} + "&date=" + {date})
    .catch((error) => {
      console.log("autosave error")
    })
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

      <div className="error-display" id="error-display">
        <p id="error-message">Error: Failed request to the backend server. Please ensure that the backend is running on the expected port (3232).</p>
        <button>Close</button>
      </div>

      <ControlledInput
        value={entry}
        setValue={setEntry}
        ariaLabel="journal command box"
        placeholder="Enter response here..."
        onKeyPress={(e) => handleKeyPress(e, entry)}
        onInput={(e) => autosave()}
      />
      <div className="button-area">
        <div className="prev-next-menu">
          <button className="prev-button" onClick={() => previousEntry}>
            <PrevButton />
            prev
          </button>
          <button className="next-button" onClick={() => nextEntry}>
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
