import { Dispatch, SetStateAction, useEffect, useState } from "react";
import JournalInput from "./JournalInput";
import MockJournalInput from "./MockJournalInput";
import "../styles/journal.css";

interface JournalProps {
  setCurrentEntry: Dispatch<SetStateAction<string>>;
  setDisplaySuggestions: (display: boolean) => void;
  onSubmit: () => void;
  onNext: () => void;
  // isSubmitted: boolean;
}


export default function JournalDisplay(props: JournalProps) {
  // const [history, setHistory] = useState<EntryInfo[]>([]);
  // const [prompt, setPrompt] = useState<string>(""); // 
  

  // useEffect(() => {
  //   if (props.isSubmitted) {
  //     // Do something when isSubmitted changes (e.g., display suggestions)
  //     props.setDisplaySuggestions(true);
  //   }
  // }, [props.isSubmitted]);

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
      {/* <JournalPrompt/> */}
      {/* <MockJournalInput
        onSubmit={() => {
          props.setDisplaySuggestions(true);
          props.onSubmit();
        }}
        // history={history}
        // setHistory={setHistory}
        // mode={mode}
        // setMode={setMode}
        setCurrentEntry={props.setCurrentEntry}
      /> */}
      <JournalInput
        onSubmit={() => {
          props.setDisplaySuggestions(true);
          props.onSubmit();
        }}
        onNext={() => {
          props.setDisplaySuggestions(false);
          props.onNext();
        }}
        // history={history}
        // setHistory={setHistory}
        // mode={mode}
        // setMode={setMode}
        setCurrentEntry={props.setCurrentEntry}
      />
    </div>
  );
}
