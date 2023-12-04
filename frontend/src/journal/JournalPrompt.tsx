import { Dispatch, SetStateAction, useState, useEffect } from "react";


export default function JournalPrompt() {

  const [prompt, setPrompt] = useState<string>("");

    // async call to the back end to get prompt
    // const fetchPrompt = async () => {
    //     // fill this in
    // }
    
    return (
      <div className="journal-prompt">
        <h2 className="prompt-heading">Daily Prompt:</h2>
        <div className="prompt-area">
          <p className="prompt-text">
            Describe a highlight and challenge from today.
          </p>
          <p className="date">Nov 30, 2023</p>
        </div>
      </div>
    );
} 