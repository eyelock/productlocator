// WARNING: DO NOT EDIT THIS FILE. THIS FILE IS MANAGED BY SPRING ROO.
// You may push code into the target .java compilation unit if you wish to edit any member(s).

package net.eyelock.productlocator.model;

import java.util.List;
import net.eyelock.productlocator.model.Media;
import net.eyelock.productlocator.model.MediaDataOnDemand;
import net.eyelock.productlocator.model.MediaIntegrationTest;
import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.transaction.annotation.Transactional;

privileged aspect MediaIntegrationTest_Roo_IntegrationTest {
    
    declare @type: MediaIntegrationTest: @RunWith(SpringJUnit4ClassRunner.class);
    
    declare @type: MediaIntegrationTest: @ContextConfiguration(locations = "classpath:/META-INF/spring/applicationContext*.xml");
    
    declare @type: MediaIntegrationTest: @Transactional;
    
    @Autowired
    private MediaDataOnDemand MediaIntegrationTest.dod;
    
    @Test
    public void MediaIntegrationTest.testCountMedia() {
        Assert.assertNotNull("Data on demand for 'Media' failed to initialize correctly", dod.getRandomMedia());
        long count = Media.countMedia();
        Assert.assertTrue("Counter for 'Media' incorrectly reported there were no entries", count > 0);
    }
    
    @Test
    public void MediaIntegrationTest.testFindMedia() {
        Media obj = dod.getRandomMedia();
        Assert.assertNotNull("Data on demand for 'Media' failed to initialize correctly", obj);
        Long id = obj.getId();
        Assert.assertNotNull("Data on demand for 'Media' failed to provide an identifier", id);
        obj = Media.findMedia(id);
        Assert.assertNotNull("Find method for 'Media' illegally returned null for id '" + id + "'", obj);
        Assert.assertEquals("Find method for 'Media' returned the incorrect identifier", id, obj.getId());
    }
    
    @Test
    public void MediaIntegrationTest.testFindAllMedia() {
        Assert.assertNotNull("Data on demand for 'Media' failed to initialize correctly", dod.getRandomMedia());
        long count = Media.countMedia();
        Assert.assertTrue("Too expensive to perform a find all test for 'Media', as there are " + count + " entries; set the findAllMaximum to exceed this value or set findAll=false on the integration test annotation to disable the test", count < 250);
        List<Media> result = Media.findAllMedia();
        Assert.assertNotNull("Find all method for 'Media' illegally returned null", result);
        Assert.assertTrue("Find all method for 'Media' failed to return any data", result.size() > 0);
    }
    
    @Test
    public void MediaIntegrationTest.testFindMediaEntries() {
        Assert.assertNotNull("Data on demand for 'Media' failed to initialize correctly", dod.getRandomMedia());
        long count = Media.countMedia();
        if (count > 20) count = 20;
        int firstResult = 0;
        int maxResults = (int) count;
        List<Media> result = Media.findMediaEntries(firstResult, maxResults);
        Assert.assertNotNull("Find entries method for 'Media' illegally returned null", result);
        Assert.assertEquals("Find entries method for 'Media' returned an incorrect number of entries", count, result.size());
    }
    
    @Test
    public void MediaIntegrationTest.testFlush() {
        Media obj = dod.getRandomMedia();
        Assert.assertNotNull("Data on demand for 'Media' failed to initialize correctly", obj);
        Long id = obj.getId();
        Assert.assertNotNull("Data on demand for 'Media' failed to provide an identifier", id);
        obj = Media.findMedia(id);
        Assert.assertNotNull("Find method for 'Media' illegally returned null for id '" + id + "'", obj);
        boolean modified =  dod.modifyMedia(obj);
        Integer currentVersion = obj.getVersion();
        obj.flush();
        Assert.assertTrue("Version for 'Media' failed to increment on flush directive", (currentVersion != null && obj.getVersion() > currentVersion) || !modified);
    }
    
    @Test
    public void MediaIntegrationTest.testMergeUpdate() {
        Media obj = dod.getRandomMedia();
        Assert.assertNotNull("Data on demand for 'Media' failed to initialize correctly", obj);
        Long id = obj.getId();
        Assert.assertNotNull("Data on demand for 'Media' failed to provide an identifier", id);
        obj = Media.findMedia(id);
        boolean modified =  dod.modifyMedia(obj);
        Integer currentVersion = obj.getVersion();
        Media merged = obj.merge();
        obj.flush();
        Assert.assertEquals("Identifier of merged object not the same as identifier of original object", merged.getId(), id);
        Assert.assertTrue("Version for 'Media' failed to increment on merge and flush directive", (currentVersion != null && obj.getVersion() > currentVersion) || !modified);
    }
    
    @Test
    public void MediaIntegrationTest.testPersist() {
        Assert.assertNotNull("Data on demand for 'Media' failed to initialize correctly", dod.getRandomMedia());
        Media obj = dod.getNewTransientMedia(Integer.MAX_VALUE);
        Assert.assertNotNull("Data on demand for 'Media' failed to provide a new transient entity", obj);
        Assert.assertNull("Expected 'Media' identifier to be null", obj.getId());
        obj.persist();
        obj.flush();
        Assert.assertNotNull("Expected 'Media' identifier to no longer be null", obj.getId());
    }
    
    @Test
    public void MediaIntegrationTest.testRemove() {
        Media obj = dod.getRandomMedia();
        Assert.assertNotNull("Data on demand for 'Media' failed to initialize correctly", obj);
        Long id = obj.getId();
        Assert.assertNotNull("Data on demand for 'Media' failed to provide an identifier", id);
        obj = Media.findMedia(id);
        obj.remove();
        obj.flush();
        Assert.assertNull("Failed to remove 'Media' with identifier '" + id + "'", Media.findMedia(id));
    }
    
}
