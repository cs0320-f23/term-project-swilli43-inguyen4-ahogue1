package edu.brown.cs.student.main.Server.LLM;

import java.util.List;

public interface LLMAPIDataSource {
  public List<String> getSuggestions();
}
