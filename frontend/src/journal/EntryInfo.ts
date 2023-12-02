export class EntryInfo {
  prompt: string;
  date: string;
  entry: string | undefined;

  constructor(
    prompt: string,
    date: string,
    entry: string | undefined
  ) {
    this.prompt = prompt;
    this.date = date;
    this.entry = entry;
  }
}