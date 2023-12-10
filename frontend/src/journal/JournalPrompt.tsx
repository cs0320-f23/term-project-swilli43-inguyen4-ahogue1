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
        <h2>Daily Prompt:</h2>
        <p>{prompt}</p>
        <p className="date">{date}</p>
    </div>
  );
} 