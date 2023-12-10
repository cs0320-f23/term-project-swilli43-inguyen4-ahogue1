import { Dispatch, SetStateAction, useState, useEffect } from "react";
import { ControlledInput } from "../../src/journal/ControlledInput";
import { EntryObject } from "../../src/journal/JournalDisplay";
import { JournalFunction } from "../../src/journal/JournalFunction";
import "../styles/journal.css";
import { EntryInfo } from "../../src/journal/EntryInfo";
import JournalPrompt from "../../src/journal/JournalPrompt";

async function mockFetchPrompt(): Promise<String | undefined> {
    const mockPrompt = "Describe a highlight and challenge from today.";
    return mockPrompt;
  }

interface JournalInputProps {
    history: EntryObject[]; // the map of past entries 
    setCurrentEntry: Dispatch<SetStateAction<string>>;
    setDisplaySuggestions: Dispatch<SetStateAction<boolean>>; // the 3 suggestions shown
  }
  