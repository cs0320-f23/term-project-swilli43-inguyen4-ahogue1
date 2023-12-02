export class EntryInfo {
  prompt: string | undefined;
  date: string | undefined;
  entry: string | undefined;

  constructor(
    prompt: string | undefined,
    date: string | undefined,
    entry: string | undefined
  ) {
    this.prompt = prompt;
    this.date = date;
    this.entry = entry;
  }
}