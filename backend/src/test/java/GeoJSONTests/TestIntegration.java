package GeoJSONTests;

import static org.junit.jupiter.api.Assertions.assertEquals;

import com.squareup.moshi.JsonAdapter;
import com.squareup.moshi.Moshi;
import com.squareup.moshi.Types;
import edu.brown.cs.student.main.GeoJSON.GeoData;
import edu.brown.cs.student.main.Server.GeoCityStateHandler;
import edu.brown.cs.student.main.Server.GeoFilterHandler;
import edu.brown.cs.student.main.Server.GeoHandler;
import edu.brown.cs.student.main.Server.GeoSearchAreaByDescriptionHandler;
import java.io.IOException;
import java.lang.reflect.Type;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.Map;
import java.util.logging.Level;
import java.util.logging.Logger;
import okio.Buffer;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import spark.Spark;

public class TestIntegration {

  private GeoData geodata;


  @BeforeAll
  public static void setupOnce() {
    // Pick an arbitrary free port
        Spark.port(0);
    //    // Eliminate logger spam in console for test suite
    Logger.getLogger("").setLevel(Level.WARNING); // empty name = root
  }

  private final Type mapStringObject =
      Types.newParameterizedType(Map.class, String.class, Object.class);
  private JsonAdapter<Map<String, Object>> adapter;

  @BeforeEach
  public void setup() {
    // In fact, restart the entire Spark server for every test!
    this.geodata = new GeoData();
    Spark.get("geodata", new GeoHandler(this.geodata));
    Spark.get("geofilter", new GeoFilterHandler(this.geodata));
    Spark.get("geocitystate", new GeoCityStateHandler(this.geodata));
    Spark.get("geosearch", new GeoSearchAreaByDescriptionHandler(this.geodata));
    Spark.init();
    Spark.awaitInitialization(); // don't continue until the server is listening
  }

  @AfterEach
  public void teardown() {
    // Gracefully stop Spark listening on both endpoints
    Spark.unmap("geodata");
    Spark.unmap("geofilter");
    Spark.unmap("geocitystate");
    Spark.unmap("geosearch");
    Spark.awaitStop(); // don't proceed until the server is stopped
  }

  private Map<String, Object> getResponse(HttpURLConnection clientConnection) throws IOException {
    Moshi moshi = new Moshi.Builder().build();
    Map<String, Object> map =
        moshi.adapter(Map.class).fromJson(new Buffer().readFrom(clientConnection.getInputStream()));
    return map;
  }

  /**
   * Helper to start a connection to a specific API endpoint/params
   *
   * @param apiCall the call string, including endpoint (NOTE: this would be better if it had more
   *     structure!)
   * @return the connection for the given URL, just after connecting
   * @throws IOException if the connection fails for some reason
   */
  private HttpURLConnection tryRequest(String apiCall) throws IOException {
    // Configure the connection (but don't actually send a request yet)
    URL requestURL = new URL("http://localhost:"+Spark.port()+"/"+apiCall);
    HttpURLConnection clientConnection = (HttpURLConnection) requestURL.openConnection();
    // The request body contains a Json object
    clientConnection.setRequestProperty("Content-Type", "application/json");
    // We're expecting a Json object in the response body
    clientConnection.setRequestProperty("Accept", "application/json");

    clientConnection.connect();
    return clientConnection;
  }

  /**
   * Tests calling the view CSV handler without first loading
   *
   * @throws IOException
   */
  @Test
  public void testGeoData() throws IOException {
    HttpURLConnection clientConnection = tryRequest("geodata");
    Map<String, Object> responseMap= getResponse(clientConnection);

    assertEquals(200, clientConnection.getResponseCode());

    Object expResult = responseMap.get("data_size");

    assertEquals(8878.0, expResult);

    clientConnection.disconnect();
  }

  @Test
  public void testGeoCityState() throws IOException {
    HttpURLConnection clientConnection = tryRequest("geocitystate?minlat=41.814&minlong=-71.4228&maxlat=41.834&maxlong=-71.4128");
    Map<String, Object> responseMap= getResponse(clientConnection);
    assertEquals(200, clientConnection.getResponseCode());


    Object city = responseMap.get("city");
    Object state = responseMap.get("state");

    assertEquals("Providence", city);
    assertEquals("RI", state);

    clientConnection.disconnect();
  }

  /**
   * search for city and state given coordinates that don't map to anything
   * @throws IOException
   */
  @Test
  public void testGeoCityState2() throws IOException {
    HttpURLConnection clientConnection = tryRequest("geocitystate?minlat=41.814&minlong=-71.4228&maxlat=41.834&maxlong=-90");

    assertEquals(200, clientConnection.getResponseCode());

    Map<String, Object> responseMap= getResponse(clientConnection);
    Object city = responseMap.get("city");
    Object state = responseMap.get("state");

    assertEquals("", city);
    assertEquals("", state);

    clientConnection.disconnect();
  }

  @Test
  public void testFilter() throws IOException {
    HttpURLConnection clientConnection = tryRequest("geofilter?minlat=40.814&minlong=-72.4228&maxlat=42.834&maxlong=-70.4128");

    assertEquals(200, clientConnection.getResponseCode());

    Map<String, Object> responseMap= getResponse(clientConnection);
    Object result = responseMap.get("feature_list_size");

    assertEquals(341.0, result);

    clientConnection.disconnect();
  }

  @Test
  public void testSearch() throws IOException {
    HttpURLConnection clientConnection = tryRequest("geosearch?keyword=Hartford");

    assertEquals(200, clientConnection.getResponseCode());

    Map<String, Object> responseMap= getResponse(clientConnection);
    Object result = responseMap.get("feature_list_size");

    assertEquals(68.0, result);
    assertEquals(1.0, this.geodata.getSearchHistorySize());

    clientConnection.disconnect();

    HttpURLConnection clientConnection2 = tryRequest("geosearch?keyword=asflkjahsfjahsfa");

    assertEquals(200, clientConnection2.getResponseCode());

    Map<String, Object> responseMap2= getResponse(clientConnection2);
    Object result2 = responseMap2.get("result");

    assertEquals("error", result2);

    // testing persistence of search
    assertEquals(2.0, this.geodata.getSearchHistorySize());

    clientConnection.disconnect();
  }

}
