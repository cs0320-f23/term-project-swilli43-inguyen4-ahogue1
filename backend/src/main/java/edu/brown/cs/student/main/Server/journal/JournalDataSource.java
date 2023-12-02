package edu.brown.cs.student.main.Server.journal;

import java.util.Date;

public interface JournalDataSource {

  void updateEntry(Date date, String newEntry, String newPrompt);
  JournalEntry getPrev() throws DatasourceException;
  JournalEntry getNext(Date date, String newPrompt);
}
