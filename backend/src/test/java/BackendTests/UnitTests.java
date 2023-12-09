package BackendTests;

import edu.brown.cs.student.main.Server.journal.JournalPromptGenerator;
import java.util.ArrayList;
import java.util.List;
import org.junit.jupiter.api.Test;
import org.testng.Assert;

public class UnitTests {

  /* Testing prompt genreation */
  @Test
  public void testPromptGenration() {
    JournalPromptGenerator promptGen = new JournalPromptGenerator();
    String randomPrompt1 = promptGen.getRandomJournalPrompt();
    String randomPrompt2 = promptGen.getRandomJournalPrompt();
    String randomPrompt3 = promptGen.getRandomJournalPrompt();
    String randomPrompt4 = promptGen.getRandomJournalPrompt();

    List<String> testPrompts = new ArrayList() {{
      add("How have you been dealing with stress lately?");
      add("Have you felt inspired by anything recently? If so, what?");
    }};

    // asser that the random prompts are in the list of test prompts
    Assert.assertTrue(testPrompts.contains(randomPrompt1));
    Assert.assertTrue(testPrompts.contains(randomPrompt2));
    Assert.assertTrue(testPrompts.contains(randomPrompt3));
    Assert.assertTrue(testPrompts.contains(randomPrompt4));

    // assert that there are multiple prompts in the list of test prompts
    Assert.assertTrue(testPrompts.size() > 1);
  }


}
