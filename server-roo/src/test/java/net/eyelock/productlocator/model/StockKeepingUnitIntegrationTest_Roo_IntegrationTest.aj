// WARNING: DO NOT EDIT THIS FILE. THIS FILE IS MANAGED BY SPRING ROO.
// You may push code into the target .java compilation unit if you wish to edit any member(s).

package net.eyelock.productlocator.model;

import java.util.List;
import net.eyelock.productlocator.model.StockKeepingUnit;
import net.eyelock.productlocator.model.StockKeepingUnitDataOnDemand;
import net.eyelock.productlocator.model.StockKeepingUnitIntegrationTest;
import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.transaction.annotation.Transactional;

privileged aspect StockKeepingUnitIntegrationTest_Roo_IntegrationTest {
    
    declare @type: StockKeepingUnitIntegrationTest: @RunWith(SpringJUnit4ClassRunner.class);
    
    declare @type: StockKeepingUnitIntegrationTest: @ContextConfiguration(locations = "classpath:/META-INF/spring/applicationContext*.xml");
    
    declare @type: StockKeepingUnitIntegrationTest: @Transactional;
    
    @Autowired
    private StockKeepingUnitDataOnDemand StockKeepingUnitIntegrationTest.dod;
    
    @Test
    public void StockKeepingUnitIntegrationTest.testCountStockKeepingUnits() {
        Assert.assertNotNull("Data on demand for 'StockKeepingUnit' failed to initialize correctly", dod.getRandomStockKeepingUnit());
        long count = StockKeepingUnit.countStockKeepingUnits();
        Assert.assertTrue("Counter for 'StockKeepingUnit' incorrectly reported there were no entries", count > 0);
    }
    
    @Test
    public void StockKeepingUnitIntegrationTest.testFindStockKeepingUnit() {
        StockKeepingUnit obj = dod.getRandomStockKeepingUnit();
        Assert.assertNotNull("Data on demand for 'StockKeepingUnit' failed to initialize correctly", obj);
        Long id = obj.getId();
        Assert.assertNotNull("Data on demand for 'StockKeepingUnit' failed to provide an identifier", id);
        obj = StockKeepingUnit.findStockKeepingUnit(id);
        Assert.assertNotNull("Find method for 'StockKeepingUnit' illegally returned null for id '" + id + "'", obj);
        Assert.assertEquals("Find method for 'StockKeepingUnit' returned the incorrect identifier", id, obj.getId());
    }
    
    @Test
    public void StockKeepingUnitIntegrationTest.testFindAllStockKeepingUnits() {
        Assert.assertNotNull("Data on demand for 'StockKeepingUnit' failed to initialize correctly", dod.getRandomStockKeepingUnit());
        long count = StockKeepingUnit.countStockKeepingUnits();
        Assert.assertTrue("Too expensive to perform a find all test for 'StockKeepingUnit', as there are " + count + " entries; set the findAllMaximum to exceed this value or set findAll=false on the integration test annotation to disable the test", count < 250);
        List<StockKeepingUnit> result = StockKeepingUnit.findAllStockKeepingUnits();
        Assert.assertNotNull("Find all method for 'StockKeepingUnit' illegally returned null", result);
        Assert.assertTrue("Find all method for 'StockKeepingUnit' failed to return any data", result.size() > 0);
    }
    
    @Test
    public void StockKeepingUnitIntegrationTest.testFindStockKeepingUnitEntries() {
        Assert.assertNotNull("Data on demand for 'StockKeepingUnit' failed to initialize correctly", dod.getRandomStockKeepingUnit());
        long count = StockKeepingUnit.countStockKeepingUnits();
        if (count > 20) count = 20;
        int firstResult = 0;
        int maxResults = (int) count;
        List<StockKeepingUnit> result = StockKeepingUnit.findStockKeepingUnitEntries(firstResult, maxResults);
        Assert.assertNotNull("Find entries method for 'StockKeepingUnit' illegally returned null", result);
        Assert.assertEquals("Find entries method for 'StockKeepingUnit' returned an incorrect number of entries", count, result.size());
    }
    
    @Test
    public void StockKeepingUnitIntegrationTest.testFlush() {
        StockKeepingUnit obj = dod.getRandomStockKeepingUnit();
        Assert.assertNotNull("Data on demand for 'StockKeepingUnit' failed to initialize correctly", obj);
        Long id = obj.getId();
        Assert.assertNotNull("Data on demand for 'StockKeepingUnit' failed to provide an identifier", id);
        obj = StockKeepingUnit.findStockKeepingUnit(id);
        Assert.assertNotNull("Find method for 'StockKeepingUnit' illegally returned null for id '" + id + "'", obj);
        boolean modified =  dod.modifyStockKeepingUnit(obj);
        Integer currentVersion = obj.getVersion();
        obj.flush();
        Assert.assertTrue("Version for 'StockKeepingUnit' failed to increment on flush directive", (currentVersion != null && obj.getVersion() > currentVersion) || !modified);
    }
    
    @Test
    public void StockKeepingUnitIntegrationTest.testMergeUpdate() {
        StockKeepingUnit obj = dod.getRandomStockKeepingUnit();
        Assert.assertNotNull("Data on demand for 'StockKeepingUnit' failed to initialize correctly", obj);
        Long id = obj.getId();
        Assert.assertNotNull("Data on demand for 'StockKeepingUnit' failed to provide an identifier", id);
        obj = StockKeepingUnit.findStockKeepingUnit(id);
        boolean modified =  dod.modifyStockKeepingUnit(obj);
        Integer currentVersion = obj.getVersion();
        StockKeepingUnit merged = obj.merge();
        obj.flush();
        Assert.assertEquals("Identifier of merged object not the same as identifier of original object", merged.getId(), id);
        Assert.assertTrue("Version for 'StockKeepingUnit' failed to increment on merge and flush directive", (currentVersion != null && obj.getVersion() > currentVersion) || !modified);
    }
    
    @Test
    public void StockKeepingUnitIntegrationTest.testPersist() {
        Assert.assertNotNull("Data on demand for 'StockKeepingUnit' failed to initialize correctly", dod.getRandomStockKeepingUnit());
        StockKeepingUnit obj = dod.getNewTransientStockKeepingUnit(Integer.MAX_VALUE);
        Assert.assertNotNull("Data on demand for 'StockKeepingUnit' failed to provide a new transient entity", obj);
        Assert.assertNull("Expected 'StockKeepingUnit' identifier to be null", obj.getId());
        obj.persist();
        obj.flush();
        Assert.assertNotNull("Expected 'StockKeepingUnit' identifier to no longer be null", obj.getId());
    }
    
    @Test
    public void StockKeepingUnitIntegrationTest.testRemove() {
        StockKeepingUnit obj = dod.getRandomStockKeepingUnit();
        Assert.assertNotNull("Data on demand for 'StockKeepingUnit' failed to initialize correctly", obj);
        Long id = obj.getId();
        Assert.assertNotNull("Data on demand for 'StockKeepingUnit' failed to provide an identifier", id);
        obj = StockKeepingUnit.findStockKeepingUnit(id);
        obj.remove();
        obj.flush();
        Assert.assertNull("Failed to remove 'StockKeepingUnit' with identifier '" + id + "'", StockKeepingUnit.findStockKeepingUnit(id));
    }
    
}
