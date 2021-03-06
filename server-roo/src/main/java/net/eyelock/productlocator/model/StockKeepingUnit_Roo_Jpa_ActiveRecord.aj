// WARNING: DO NOT EDIT THIS FILE. THIS FILE IS MANAGED BY SPRING ROO.
// You may push code into the target .java compilation unit if you wish to edit any member(s).

package net.eyelock.productlocator.model;

import java.util.List;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import net.eyelock.productlocator.model.StockKeepingUnit;
import org.springframework.transaction.annotation.Transactional;

privileged aspect StockKeepingUnit_Roo_Jpa_ActiveRecord {
    
    @PersistenceContext
    transient EntityManager StockKeepingUnit.entityManager;
    
    public static final EntityManager StockKeepingUnit.entityManager() {
        EntityManager em = new StockKeepingUnit().entityManager;
        if (em == null) throw new IllegalStateException("Entity manager has not been injected (is the Spring Aspects JAR configured as an AJC/AJDT aspects library?)");
        return em;
    }
    
    public static long StockKeepingUnit.countStockKeepingUnits() {
        return entityManager().createQuery("SELECT COUNT(o) FROM StockKeepingUnit o", Long.class).getSingleResult();
    }
    
    public static List<StockKeepingUnit> StockKeepingUnit.findAllStockKeepingUnits() {
        return entityManager().createQuery("SELECT o FROM StockKeepingUnit o", StockKeepingUnit.class).getResultList();
    }
    
    public static StockKeepingUnit StockKeepingUnit.findStockKeepingUnit(Long id) {
        if (id == null) return null;
        return entityManager().find(StockKeepingUnit.class, id);
    }
    
    public static List<StockKeepingUnit> StockKeepingUnit.findStockKeepingUnitEntries(int firstResult, int maxResults) {
        return entityManager().createQuery("SELECT o FROM StockKeepingUnit o", StockKeepingUnit.class).setFirstResult(firstResult).setMaxResults(maxResults).getResultList();
    }
    
    @Transactional
    public void StockKeepingUnit.persist() {
        if (this.entityManager == null) this.entityManager = entityManager();
        this.entityManager.persist(this);
    }
    
    @Transactional
    public void StockKeepingUnit.remove() {
        if (this.entityManager == null) this.entityManager = entityManager();
        if (this.entityManager.contains(this)) {
            this.entityManager.remove(this);
        } else {
            StockKeepingUnit attached = StockKeepingUnit.findStockKeepingUnit(this.id);
            this.entityManager.remove(attached);
        }
    }
    
    @Transactional
    public void StockKeepingUnit.flush() {
        if (this.entityManager == null) this.entityManager = entityManager();
        this.entityManager.flush();
    }
    
    @Transactional
    public void StockKeepingUnit.clear() {
        if (this.entityManager == null) this.entityManager = entityManager();
        this.entityManager.clear();
    }
    
    @Transactional
    public StockKeepingUnit StockKeepingUnit.merge() {
        if (this.entityManager == null) this.entityManager = entityManager();
        StockKeepingUnit merged = this.entityManager.merge(this);
        this.entityManager.flush();
        return merged;
    }
    
}
