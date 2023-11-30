package edu.brown.cs.student.main.Server;

import com.google.common.cache.CacheBuilder;
import com.google.common.cache.CacheLoader;
import com.google.common.cache.LoadingCache;
import edu.brown.cs.student.main.GeoJSON.Feature;
import edu.brown.cs.student.main.GeoJSON.GeoData;
import edu.brown.cs.student.main.GeoJSON.GeoDataSource;
import java.io.IOException;
import java.util.List;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.TimeUnit;
import org.jetbrains.annotations.NotNull;


/**
 * Cache class is responsible for saving broadband API calls for specified/passed in time
 * and cache size. Queries API broadband value if key exists; if not calls CensusAPI functionality
 * to make appropriate API call.
 */
public class Cache {

  private final LoadingCache<String, List<Feature>> cache;

  /**
   * Initializes new guava cache with given time and size limit. Defines load function, which is
   * called when key does not exist in cache. Load function calls CensusAPISource and returns
   * braodband value.
   *
   * @param size passed in to determine maximum cache sized before reset
   * @param time passed in to determine how long entries remain in cache
   * @param geodata passed in to allow for CensusAPI call when key is not in cache
   */
  public Cache(int size, int time, GeoDataSource geodata) {

    this.cache =
        CacheBuilder.newBuilder()
            .maximumSize(size)
            .expireAfterWrite(time, TimeUnit.MINUTES)
            .recordStats()
            .build(
                new CacheLoader<>() {
                  @NotNull
                  @Override
                  public List<Feature> load(@NotNull String bb)
                      throws IOException {
                      String[] coords = bb.split(" ");
                      Double minLong = Double.parseDouble(coords[0]);
                      Double minLat = Double.parseDouble(coords[1]);
                      Double maxLong = Double.parseDouble(coords[2]);
                      Double maxLat = Double.parseDouble(coords[3]);
                      return geodata.filterBBox(minLong, minLat, maxLong, maxLat);
                  }
                });
  }

  /**
   * Gets value from cache given key containing concatenated state and county.
   *
   * @param value state and county value to retrieve
   * @return Record, which stores broadband value and time of API call
   * @throws ExecutionException thrown by guava cache when exceptions are found
   */
  public List<Feature> get(String value) throws ExecutionException {
    System.out.println("getting from cache...");
    System.out.println(this.cache.size());
    return this.cache.get(value);
  }
}