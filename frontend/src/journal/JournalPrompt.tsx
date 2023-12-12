import { Dispatch, SetStateAction, useState, useEffect } from "react";

interface JournalInputProps {
  prompt: string;
  date: string;
}

export default function JournalPrompt({
  prompt,
  date,
}: JournalInputProps) {

  return (
    <div className="journal-prompt">
      <h2 className="prompt-heading">Daily Prompt:</h2>
      <div className="prompt-area">
        <p className="prompt-text">{prompt}</p>
        <p className="date">{date}</p>
      </div>
    </div>
  );
} 