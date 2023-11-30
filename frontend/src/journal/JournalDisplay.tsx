import { Dispatch, SetStateAction, useState } from "react";
import JournalPrompt from "./JournalPrompt";
import { JournalInput } from "./JournalInput";
/* The input gets parsed into an input object so that the data can be easily accessed and displayed */
export interface EntryObject {
  number: number;
  date: string;
  entry: string;
}

interface JournalProps {
  setCurrentEntry: Dispatch<SetStateAction<string>>;
  setDisplaySuggestions: Dispatch<SetStateAction<boolean>>;
}

/* The main repl component that contains the shared history state and displays the history and input. */
export default function JournalDisplay(props: JournalProps) {
  const [history, setHistory] = useState<EntryObject[]>([]);

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
    <div className="journal" aria-label="journal">
      <div className="Journal-header">
        <h1 aria-label="title">Journal Buddy</h1>
      </div>
      <JournalPrompt/>
      <hr></hr>
      <JournalInput
        history={history}
        // setHistory={setHistory}
        // mode={mode}
        // setMode={setMode}
        setCurrentEntry={props.setCurrentEntry}
        setDisplaySuggestions={props.setDisplaySuggestions}
      />
    </div>
  );
}
