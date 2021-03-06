// WARNING: DO NOT EDIT THIS FILE. THIS FILE IS MANAGED BY SPRING ROO.
// You may push code into the target .java compilation unit if you wish to edit any member(s).

package net.eyelock.productlocator.model;

import net.eyelock.productlocator.model.Media;
import net.eyelock.productlocator.model.Product;
import net.eyelock.productlocator.model.StockKeepingUnit;

privileged aspect StockKeepingUnit_Roo_JavaBean {
    
    public Product StockKeepingUnit.getProduct() {
        return this.product;
    }
    
    public void StockKeepingUnit.setProduct(Product product) {
        this.product = product;
    }
    
    public String StockKeepingUnit.getName() {
        return this.name;
    }
    
    public void StockKeepingUnit.setName(String name) {
        this.name = name;
    }
    
    public String StockKeepingUnit.getTeaser() {
        return this.teaser;
    }
    
    public void StockKeepingUnit.setTeaser(String teaser) {
        this.teaser = teaser;
    }
    
    public String StockKeepingUnit.getDescription() {
        return this.description;
    }
    
    public void StockKeepingUnit.setDescription(String description) {
        this.description = description;
    }
    
    public Media StockKeepingUnit.getIcon() {
        return this.icon;
    }
    
    public void StockKeepingUnit.setIcon(Media icon) {
        this.icon = icon;
    }
    
    public Media StockKeepingUnit.getImage() {
        return this.image;
    }
    
    public void StockKeepingUnit.setImage(Media image) {
        this.image = image;
    }
    
    public Boolean StockKeepingUnit.getActive() {
        return this.active;
    }
    
    public void StockKeepingUnit.setActive(Boolean active) {
        this.active = active;
    }
    
    public Float StockKeepingUnit.getPrice() {
        return this.price;
    }
    
    public void StockKeepingUnit.setPrice(Float price) {
        this.price = price;
    }
    
}
