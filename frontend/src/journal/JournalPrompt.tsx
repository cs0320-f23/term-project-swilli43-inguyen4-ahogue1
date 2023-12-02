import { Dispatch, SetStateAction, useState, useEffect } from "react";


export default function JournalPrompt() {

  const [prompt, setPrompt] = useState<string>("");

  async function fetchPrompt(): Promise<String | void> {
    const link =  "http://localhost:3232/getprompt";

  return fetch(link)
    .then((response) => response.json())
    .then((responseObject) => {
      console.log("response object " + responseObject);
      return responseObject.prompt;
    });


  }

  const fetchData = async () => {
    const prompt = await fetchPrompt();

  if (typeof prompt === "string") {
      setPrompt(prompt);
    }
  }

  console.log("prompt is " + prompt)
  return (
    <div className="journal-prompt">
        <h2>Daily Prompt:</h2>
        <p>{prompt}</p>
    </div>
  );
} 