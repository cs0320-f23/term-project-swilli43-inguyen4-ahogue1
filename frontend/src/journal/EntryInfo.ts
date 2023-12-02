export class EntryInfo {
  date: string;
  entry: string | undefined;

  constructor(
    date: string,
    entry: string | undefined
  ) {
    this.date = date;
    this.entry = entry;
  }
}