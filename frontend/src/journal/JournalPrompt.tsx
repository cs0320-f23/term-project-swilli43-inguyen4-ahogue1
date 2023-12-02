import { Dispatch, SetStateAction, useState, useEffect } from "react";


export default function JournalPrompt() {

  const [prompt, setPrompt] = useState<string>("");

    // async call to the back end to get prompt
    // const fetchPrompt = async () => {
    //     // fill this in
    // }
    
    return (
    <div className="journal-prompt">
        <h2>Daily Prompt:</h2>
        <p>Describe a highlight and challenge from today.</p>
    </div>
  );
} 