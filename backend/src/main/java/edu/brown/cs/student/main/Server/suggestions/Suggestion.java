package edu.brown.cs.student.main.Server.suggestions;

import java.util.List;

public class Suggestion {
  private String suggestion;
  private int numClicks;
  private List<Float> vectorEmbedding;


  public Suggestion(String suggestion) {
    this.suggestion = suggestion;
    this.numClicks = 1;
    this.vectorEmbedding;
  }

  public void updateNumClicks(){
    this.numClicks++;
  }

  /**
   * Returns a defensive copy of the # of clicks associated with a suggestion
   * @return
   */
  public int getNumClicks(){
    int clicksCopy = this.numClicks;
    return clicksCopy;

  }

}
