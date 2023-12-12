import { EntryInfo } from "../../src/journal/EntryInfo";

export const mockPrompt1: string = "Mock: Describe a highlight and challenge from today.";
export const mockPrompt2: string = "Mock: Describe your emotions over the past few days.";
export const mockPrompt3: string = "Mock: What helps you with difficult emotions?";
export const mockDate: string = "Mock: Dec 18, 2023";
export const mockEntry: string = "Mock: I've been really sad, but also really grateful.";
export const mockEntry2: string = "Mock: After journaling about my sadness and gratitude, I feel much better.";

export const mockEntryInfo1: EntryInfo = new EntryInfo(mockPrompt2, mockEntry, mockDate);
export const mockEntryInfo2: EntryInfo = new EntryInfo(mockPrompt3, mockEntry2, mockDate);
export const mockBackend: EntryInfo[] = [];