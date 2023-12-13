package edu.brown.cs.student.main.Server.LLM;

import java.util.ArrayList;
import java.util.List;

public class MockLLMAPI implements LLMAPIDataSource {
  private List<String> suggestionList;
  
  public MockLLMAPI() {
    this.suggestionList = this.generateSuggestions();
  }
  
  private List<String> generateSuggestions() {
    List<String> suggestionList = new ArrayList() {{
        add("Go for a walk outside");
        add("Go for a run");
        add("Call a loved one");
        add("Talk to a friend");
        add("Do a deep breathing exercise");  
        add("Listen to a guided meditation");
        add("Take a shower or warm bath.");
        add("Enjoy a healthy snack.");
        add("Stretch or do yoga");
        add("Do some exercise");
      }};
    return suggestionList;
  }



  
  /**
   * Returns a hard coded, mock defensive copy of the suggestion list
   * @return a defensive copy of the suggestions list
   */
  public List<String> getSuggestions() {
    List<String> suggestionListCopy = this.suggestionList;
    return suggestionListCopy;
  }

}
