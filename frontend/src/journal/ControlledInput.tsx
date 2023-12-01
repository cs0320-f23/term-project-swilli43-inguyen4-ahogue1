import { Dispatch, KeyboardEventHandler, SetStateAction } from "react";
import "../styles/journal.css";

// Remember that parameter names don't necessarily need to overlap;
// I could use different variable names in the actual function.
interface ControlledInputProps {
  value: string;
  // This type comes from React+TypeScript. VSCode can suggest these.
  //   Concretely, this means "a function that sets a state containing a string"
  setValue: Dispatch<SetStateAction<string>>;
  ariaLabel: string;
  onKeyPress: KeyboardEventHandler<HTMLInputElement>;
  // onInput: React.FormEventHandler<HTMLInputElement>;
}

// Input boxes contain state. We want to make sure React is managing that state,
//   so we have a special component that wraps the input box.
export function ControlledInput({
  value,
  setValue,
  ariaLabel,
  onKeyPress,
}: ControlledInputProps) {
  return (
    <input
      type="text"
      className="journal-command-box"
      value={value}
      placeholder="Enter response here..."
      onChange={(ev) => setValue(ev.target.value)}
      aria-label={ariaLabel}
      aria-description="Enter journal response"
      onKeyPress={onKeyPress}
      // onInput={onInput}
    ></input>
  );
}
