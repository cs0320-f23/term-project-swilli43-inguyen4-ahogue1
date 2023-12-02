package edu.brown.cs.student.main.Server.handlers;

import com.squareup.moshi.JsonAdapter;
import com.squareup.moshi.Moshi;
import com.squareup.moshi.Types;

import edu.brown.cs.student.main.Server.journal.DatasourceException;
import edu.brown.cs.student.main.Server.journal.JournalDataSource;
import edu.brown.cs.student.main.Server.journal.JournalEntry;
import java.lang.reflect.Type;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import spark.Request;
import spark.Response;
import spark.Route;

public class JournalGetNextHandler implements Route {
  private JournalDataSource journalHistory;

  public JournalGetNextHandler(JournalDataSource journalHistory) {
    this.journalHistory = journalHistory;
  }

  public Object handle(Request request, Response response) throws Exception {
    System.out.println("I'm in the get next handler");
    Moshi moshi = new Moshi.Builder().build();
    Type mapStringObject = Types.newParameterizedType(Map.class, String.class, Object.class);
    JsonAdapter<Map<String, Object>> adapter = moshi.adapter(mapStringObject);
    Map<String, Object> responseMap = new HashMap<>();

    Date date = new Date(); // gets current date
    System.out.println("date is: " + date.toString());
    String prompt = request.queryParams("prompt");
    System.out.println("prompt is: " + prompt);

    JournalEntry currentEntry = this.journalHistory.getNext(date, prompt);
    System.out.println(currentEntry);
    responseMap.put("result", "success");
    responseMap.put("journal_date", currentEntry.getDate());
    responseMap.put("journal_entry", currentEntry.getEntry());
    responseMap.put("journal_prompt", currentEntry.getPrompt());

    return adapter.toJson(responseMap);
  }

}
