package edu.brown.cs.student.main.Server.handlers;

import com.squareup.moshi.JsonAdapter;
import com.squareup.moshi.Moshi;
import com.squareup.moshi.Types;
import edu.brown.cs.student.main.Server.journal.JournalDataSource;
import edu.brown.cs.student.main.Server.journal.JournalEntry;
import java.lang.reflect.Type;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import spark.Request;
import spark.Response;
import spark.Route;

public class JournalUpdateEntryHandler implements Route {
  private JournalDataSource journalHistory;

  public JournalUpdateEntryHandler(JournalDataSource journalHistory) {
    this.journalHistory = journalHistory;
  }

  public Object handle(Request request, Response response) throws Exception {
    Moshi moshi = new Moshi.Builder().build();
    Type mapStringObject = Types.newParameterizedType(Map.class, String.class, Object.class);
    JsonAdapter<Map<String, Object>> adapter = moshi.adapter(mapStringObject);
    Map<String, Object> responseMap = new HashMap<>();

    Date date = new Date(); // gets current date
    String entry = request.queryParams("entry");
    String prompt = request.queryParams("prompt");

    this.journalHistory.updateEntry(date, entry, prompt);
    responseMap.put("result", "success");

    return adapter.toJson(responseMap);
  }
}
