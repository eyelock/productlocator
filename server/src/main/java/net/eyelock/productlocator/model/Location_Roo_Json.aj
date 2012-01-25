// WARNING: DO NOT EDIT THIS FILE. THIS FILE IS MANAGED BY SPRING ROO.
// You may push code into the target .java compilation unit if you wish to edit any member(s).

package net.eyelock.productlocator.model;

import flexjson.JSONDeserializer;
import flexjson.JSONSerializer;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import net.eyelock.productlocator.model.Location;

privileged aspect Location_Roo_Json {
    
    public String Location.toJson() {
        return new JSONSerializer().exclude("*.class").serialize(this);
    }
    
    public static Location Location.fromJsonToLocation(String json) {
        return new JSONDeserializer<Location>().use(null, Location.class).deserialize(json);
    }
    
    public static String Location.toJsonArray(Collection<Location> collection) {
        return new JSONSerializer().exclude("*.class").serialize(collection);
    }
    
    public static Collection<Location> Location.fromJsonArrayToLocations(String json) {
        return new JSONDeserializer<List<Location>>().use(null, ArrayList.class).use("values", Location.class).deserialize(json);
    }
    
}
