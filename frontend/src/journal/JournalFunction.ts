import { EntryInfo } from "./EntryInfo";

export interface JournalFunction {
  (args: Array<string>): Promise<EntryInfo>;
}

export interface MockedJournalFunction {
  (args: Array<string>): Array<EntryInfo>;
}