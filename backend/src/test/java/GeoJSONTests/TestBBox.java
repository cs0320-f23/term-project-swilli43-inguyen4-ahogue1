package GeoJSONTests;

import org.junit.jupiter.api.Test;
import org.testng.Assert;
import java.util.*;
import edu.brown.cs.student.main.GeoJSON.GeoData;
import edu.brown.cs.student.main.GeoJSON.Feature;

public class TestBBox {


  /**
   * unit test the bbox function with a successful bounding box
   */
  @Test
  public void successfulTestBBox() {
    GeoData geoData = new GeoData();
    // Birmingham Alabama, name: Mountain Brook Estates and Country Club Gardens (outside city limits)
    List<Feature> result =  geoData.filterBBox(-86.768971, 33.47186,  -86.724829, 33.501794);
    for (Feature feature : result) {
      Assert.assertEquals(feature.properties().city(), "Birmingham");
      Assert.assertEquals(feature.properties().state(), "AL");
    }
  }

  /**
   * unit test the bbox function with a unsuccessful bounding box
   * (meaning the search doesn't find any features)
   */
  @Test
  public void unsuccessfulTestBBox() {
    GeoData geoData = new GeoData();
    List<Feature> result =  geoData.filterBBox(-180, -90,  -180.1, -90.1);
    Assert.assertEquals(result.size(), 0);
  }
  /**
   * fuzz test the filter at the unit-testing level
   */
  @Test
  public void randomTestBBox() {

    GeoData geoData = new GeoData();

    for (int i = 0; i < 10; i++) {

      double minLong = generateRandomDouble(-180, -86.768971);
      double maxLong = generateRandomDouble(-86.724829, 180);

      double minLat = generateRandomDouble(-90, 33.47186);
      double maxLat = generateRandomDouble(33.501794, 90);

      List<Feature> featureList = geoData.filterBBox(minLong, minLat, maxLong, maxLat);
      Assert.assertTrue(
          containsCityState(featureList, "Birmingham", "AL", "Mountain Brook Estates and Country Club Gardens (outside city limits)"));
    }
    for (int i = 0; i < 10; i++) {

      double minLong = generateRandomDouble(-86.768971, -86.724829);
      double maxLong = generateRandomDouble(-86.768971, -86.724829);

      double minLat = generateRandomDouble(33.47186, 33.501794);
      double maxLat = generateRandomDouble(33.47186, 33.501794);

      List<Feature> featureList = geoData.filterBBox(minLong, minLat, maxLong, maxLat);
      Assert.assertFalse(
          containsCityState(featureList, "Birmingham", "AL", "Mountain Brook Estates and Country Club Gardens (outside city limits)"));
    }
  }



  public static double generateRandomDouble(double min, double max) {
    Random random = new Random();
    return min + (max - min) * random.nextDouble();
  }

  public static boolean containsCityState(List<Feature> featureList, String city, String state, String name) {
    for (Feature feature : featureList) {
      if (feature.properties().city().equals(city) && feature.properties().state().equals(state)
          && feature.properties().name().equals(name)) {
        return true;
      }
    }
    return false;
  }
}
