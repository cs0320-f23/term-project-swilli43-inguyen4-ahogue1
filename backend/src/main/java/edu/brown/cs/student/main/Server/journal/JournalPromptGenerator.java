package edu.brown.cs.student.main.Server.journal;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Random;

public class JournalPromptGenerator {

  private List<String> journalPrompts;

  public JournalPromptGenerator() {
    // initialize prompts
    this.journalPrompts = generatePromptList();
  }

  private List generatePromptList() {
    List<String> journalPrompts = new ArrayList() {{
      add("How have you been dealing with stress lately?");
      add("Have you felt inspired by anything recently? If so, what?");
    }};

    return journalPrompts;
  }

  public String getRandomJournalPrompt() {
    Collections.shuffle(this.journalPrompts);
    String journalPrompt = this.journalPrompts.get(0);
    return journalPrompt;
  }

}
