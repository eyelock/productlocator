// WARNING: DO NOT EDIT THIS FILE. THIS FILE IS MANAGED BY SPRING ROO.
// You may push code into the target .java compilation unit if you wish to edit any member(s).

package net.eyelock.productlocator.model;

import java.security.SecureRandom;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Random;
import javax.validation.ConstraintViolation;
import javax.validation.ConstraintViolationException;
import net.eyelock.productlocator.model.MediaDataOnDemand;
import net.eyelock.productlocator.model.Product;
import net.eyelock.productlocator.model.ProductDataOnDemand;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

privileged aspect ProductDataOnDemand_Roo_DataOnDemand {
    
    declare @type: ProductDataOnDemand: @Component;
    
    private Random ProductDataOnDemand.rnd = new SecureRandom();
    
    private List<Product> ProductDataOnDemand.data;
    
    @Autowired
    private MediaDataOnDemand ProductDataOnDemand.mediaDataOnDemand;
    
    public Product ProductDataOnDemand.getNewTransientProduct(int index) {
        Product obj = new Product();
        setActive(obj, index);
        setAvailableEverywhere(obj, index);
        setDescription(obj, index);
        setName(obj, index);
        setOrderedBy(obj, index);
        setTeaser(obj, index);
        return obj;
    }
    
    public void ProductDataOnDemand.setActive(Product obj, int index) {
        Boolean active = Boolean.TRUE;
        obj.setActive(active);
    }
    
    public void ProductDataOnDemand.setAvailableEverywhere(Product obj, int index) {
        Boolean availableEverywhere = Boolean.TRUE;
        obj.setAvailableEverywhere(availableEverywhere);
    }
    
    public void ProductDataOnDemand.setDescription(Product obj, int index) {
        String description = "description_" + index;
        if (description.length() > 1000) {
            description = description.substring(0, 1000);
        }
        obj.setDescription(description);
    }
    
    public void ProductDataOnDemand.setName(Product obj, int index) {
        String name = "name_" + index;
        if (name.length() > 100) {
            name = name.substring(0, 100);
        }
        obj.setName(name);
    }
    
    public void ProductDataOnDemand.setOrderedBy(Product obj, int index) {
        int orderedBy = 0;
        obj.setOrderedBy(orderedBy);
    }
    
    public void ProductDataOnDemand.setTeaser(Product obj, int index) {
        String teaser = "teaser_" + index;
        if (teaser.length() > 255) {
            teaser = teaser.substring(0, 255);
        }
        obj.setTeaser(teaser);
    }
    
    public Product ProductDataOnDemand.getSpecificProduct(int index) {
        init();
        if (index < 0) {
            index = 0;
        }
        if (index > (data.size() - 1)) {
            index = data.size() - 1;
        }
        Product obj = data.get(index);
        Long id = obj.getId();
        return Product.findProduct(id);
    }
    
    public Product ProductDataOnDemand.getRandomProduct() {
        init();
        Product obj = data.get(rnd.nextInt(data.size()));
        Long id = obj.getId();
        return Product.findProduct(id);
    }
    
    public boolean ProductDataOnDemand.modifyProduct(Product obj) {
        return false;
    }
    
    public void ProductDataOnDemand.init() {
        int from = 0;
        int to = 10;
        data = Product.findProductEntries(from, to);
        if (data == null) {
            throw new IllegalStateException("Find entries implementation for 'Product' illegally returned null");
        }
        if (!data.isEmpty()) {
            return;
        }
        
        data = new ArrayList<Product>();
        for (int i = 0; i < 10; i++) {
            Product obj = getNewTransientProduct(i);
            try {
                obj.persist();
            } catch (ConstraintViolationException e) {
                StringBuilder msg = new StringBuilder();
                for (Iterator<ConstraintViolation<?>> iter = e.getConstraintViolations().iterator(); iter.hasNext();) {
                    ConstraintViolation<?> cv = iter.next();
                    msg.append("[").append(cv.getConstraintDescriptor()).append(":").append(cv.getMessage()).append("=").append(cv.getInvalidValue()).append("]");
                }
                throw new RuntimeException(msg.toString(), e);
            }
            obj.flush();
            data.add(obj);
        }
    }
    
}
