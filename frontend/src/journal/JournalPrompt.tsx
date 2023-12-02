import { Dispatch, SetStateAction, useState, useEffect } from "react";


export default function JournalPrompt() {

  const [prompt, setPrompt] = useState<String | undefined>("");

  async function fetchPrompt(): Promise<String | undefined> {
    const link =  "http://localhost:3232/getprompt";

  return fetch(link)
    .then((response) => response.json())
    .then((responseObject) => {
      console.log("response object " + responseObject);
      console.log("PROMPT: " + responseObject.prompt)
      return responseObject.prompt;
    });


  }

  /* gets the prompt when the web page initializes */
  useEffect(() => {
    const fetchData = async () => {
      const prompt = await fetchPrompt();
      setPrompt(prompt);
    } 
    fetchData();
  });

  console.log("prompt is " + prompt)
  return (
    <div className="journal-prompt">
        <h2>Daily Prompt:</h2>
        <p>{prompt}</p>
    </div>
  );
} 