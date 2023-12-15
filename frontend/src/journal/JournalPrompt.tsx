/**
 * These are the props for the JournalInput component
 */
interface JournalInputProps {
  prompt: string;
  date: string;
}

/**
 * This is a wrapper component for the journal prompt and the date which is fetched from the 
 * backend in JournalInput
 * @param param0 - the interface above containing the arguments to JournalInput
 * @returns an HTML div representing the prompt area on the journal display
 */
export default function JournalPrompt({
  prompt,
  date,
}: JournalInputProps) {

  return (
    <div className="journal-prompt">
      <h2 className="prompt-heading">Daily Prompt:</h2>
      <div className="prompt-area">
        <p className="prompt-text" aria-label="journal prompt">{prompt}</p>
        <p className="date" aria-label="date created">{date}</p>
      </div>
    </div>
  );
} 