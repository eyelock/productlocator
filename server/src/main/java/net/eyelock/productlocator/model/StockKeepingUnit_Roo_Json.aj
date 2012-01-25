// WARNING: DO NOT EDIT THIS FILE. THIS FILE IS MANAGED BY SPRING ROO.
// You may push code into the target .java compilation unit if you wish to edit any member(s).

package net.eyelock.productlocator.model;

import flexjson.JSONDeserializer;
import flexjson.JSONSerializer;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import net.eyelock.productlocator.model.StockKeepingUnit;

privileged aspect StockKeepingUnit_Roo_Json {
    
    public String StockKeepingUnit.toJson() {
        return new JSONSerializer().exclude("*.class").serialize(this);
    }
    
    public static StockKeepingUnit StockKeepingUnit.fromJsonToStockKeepingUnit(String json) {
        return new JSONDeserializer<StockKeepingUnit>().use(null, StockKeepingUnit.class).deserialize(json);
    }
    
    public static String StockKeepingUnit.toJsonArray(Collection<StockKeepingUnit> collection) {
        return new JSONSerializer().exclude("*.class").serialize(collection);
    }
    
    public static Collection<StockKeepingUnit> StockKeepingUnit.fromJsonArrayToStockKeepingUnits(String json) {
        return new JSONDeserializer<List<StockKeepingUnit>>().use(null, ArrayList.class).use("values", StockKeepingUnit.class).deserialize(json);
    }
    
}
