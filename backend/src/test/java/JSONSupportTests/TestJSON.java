package JSONSupportTests;

import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.junit.jupiter.api.Assertions.assertTrue;

import edu.brown.cs.student.main.JSONSupport.ParseJSON;
import edu.brown.cs.student.main.JSONSupport.SearchJSON;
import java.io.FileReader;
import java.io.IOException;
import org.junit.jupiter.api.Test;

public class TestJSON {

  /** Test searching on json succeeds */
  @Test
  public void basicJsonSearch() {
    try {
      FileReader fileReader = new FileReader("data/randomJSON.json");
      ParseJSON parsedJson = new ParseJSON(fileReader);

      SearchJSON searchJ = new SearchJSON(parsedJson);
      String searchResult = searchJ.search("2023", "properties");

      assertTrue(searchResult.contains("2023"));
    } catch (IOException e) {
      System.err.println();
    }
  }

  /** Test error thrown when column does not exist */
  @Test
  public void invalidJsonSearch() {
    try {
      FileReader fileReader = new FileReader("data/randomJSON.json");
      ParseJSON parsedJ = new ParseJSON(fileReader);

      SearchJSON searchJ = new SearchJSON(parsedJ);
      assertThrows(
          IllegalArgumentException.class,
          () -> {
            searchJ.search("aasjdakjsas", "invalid field");
          });

    } catch (IOException e) {
      System.err.println();
    }
  }
}
