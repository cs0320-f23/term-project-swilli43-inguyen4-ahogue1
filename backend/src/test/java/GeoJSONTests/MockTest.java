package GeoJSONTests;

import static org.junit.jupiter.api.Assertions.assertEquals;

import com.squareup.moshi.JsonAdapter;
import com.squareup.moshi.Moshi;
import com.squareup.moshi.Types;
import edu.brown.cs.student.main.GeoJSON.MockGeoData;
import edu.brown.cs.student.main.Server.GeoCityStateHandler;
import edu.brown.cs.student.main.Server.GeoFilterHandler;
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

public class MockTest {

  @BeforeAll
  public static void setupOnce() {
    // Pick an arbitrary free port
        Spark.port(0);
    //    // Eliminate logger spam in console for test suite
    Logger.getLogger("").setLevel(Level.WARNING); // empty name = root
  }

  @BeforeEach
  public void setup() {
    // In fact, restart the entire Spark server for every test!
    MockGeoData mockData = new MockGeoData();
    Spark.get("geofilter", new GeoFilterHandler(mockData));
    Spark.get("geocitystate", new GeoCityStateHandler(mockData));
    Spark.get("geosearch", new GeoSearchAreaByDescriptionHandler(mockData));
    Spark.init();
    Spark.awaitInitialization(); // don't continue until the server is listening
  }

  @AfterEach
  public void teardown() {
    // Gracefully stop Spark listening on both endpoints
    Spark.unmap("/order");
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

  @Test
  public void testGeoCityStateHandler() throws IOException {
    HttpURLConnection clientConnection = tryRequest("geocitystate?minlat=33.497543&minlong=-86.756777&maxlat=33.497543&maxlong=-86.756777");

    assertEquals(200, clientConnection.getResponseCode());

    Map<String, Object> responseMap= getResponse(clientConnection);

    Object city = responseMap.get("city");
    Object state = responseMap.get("state");

    assertEquals("Birmingham", city);
    assertEquals("AL", state);

    clientConnection.disconnect();
  }

  @Test
  public void testGeoCityState2() throws IOException {
    HttpURLConnection clientConnection = tryRequest("geocitystate?minlat=0&minlong=0&maxlat=0&maxlong=0");

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
    HttpURLConnection clientConnection = tryRequest("geofilter?minlat=-90&minlong=-180&maxlat=90&maxlong=180");

    assertEquals(200, clientConnection.getResponseCode());

    Map<String, Object> responseMap= getResponse(clientConnection);
    Object result = responseMap.get("feature_list_size");

    assertEquals(1.0, result);

    clientConnection.disconnect();
  }

}
