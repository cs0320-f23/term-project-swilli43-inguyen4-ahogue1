import { EntryInfo } from "./EntryInfo";

export interface JournalFunction {
  (args: Array<string>): Promise<EntryInfo>;
}
