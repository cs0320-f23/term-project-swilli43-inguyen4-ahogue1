import { Dispatch, KeyboardEventHandler, SetStateAction, useEffect, useRef } from "react";
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
  placeholder: string;
}

// Input boxes contain state. We want to make sure React is managing that state,
//   so we have a special component that wraps the input box.
export function ControlledInput({
  value,
  setValue,
  ariaLabel,
  onKeyPress,
  placeholder
}: ControlledInputProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const adjustInputHeight = () => {
    const textareaElement = textareaRef.current;

    // updates the size of the box as the user types 
    if (textareaElement) {
      textareaElement.style.height = "auto";
      textareaElement.style.height = `${Math.min(textareaElement.scrollHeight, 20)}px`;
    }
  };

  useEffect(() => {
    adjustInputHeight();
  }, [value]);
  
  return (
    <textarea
      ref={textareaRef}
      className="journal-command-box"
      id="journal-command-box"
      value={value}
      placeholder={placeholder}
      onChange={(ev) => {
        setValue(ev.target.value);
        adjustInputHeight();
      }}
      aria-label="journal command box"
      aria-description="Enter journal response"
      //onKeyPress={onKeyPress}
      // onInput={onInput}
    ></textarea>
  );
}

export function LoginControlledInput({
  value,
  setValue,
  ariaLabel,
  onKeyPress,
  placeholder,
}: ControlledInputProps) {

  return (
    <input
      className="login-command-box"
      value={value}
      placeholder={placeholder}
      onChange={(ev) => {
        setValue(ev.target.value);
      }}
      aria-label={ariaLabel}
      aria-description="Enter email and password"
      //onKeyPress={onKeyPress}
      // onInput={onInput}
    ></input>
  );
}

