package edu.brown.cs.student.main.Server.suggestions;

import java.util.*;

public class SuggestionHistory implements SuggestionDataSource {
  private List<Suggestion> suggestionHistory = new ArrayList();

  public SuggestionHistory() {

  }

  public void saveSuggestion(String suggestion) {
    // if suggestion at
    // ultimately:
    // save to suggestionHistory

    // if suggestion exists in suggestionHistory, increment numClicks
    // if suggestion doesn't exist in suggestionHistory, add it & initialize numClicks to 1


    suggestionHistory.put(new Suggestion(suggestion));

  }


  /**
   * Returns the top 3 suggestions as computed by the recommendation algorithm
   */
  public void generateSuggestions() {

  }

}
