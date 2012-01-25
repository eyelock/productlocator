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
import net.eyelock.productlocator.model.Article;
import net.eyelock.productlocator.model.ArticleDataOnDemand;
import net.eyelock.productlocator.model.Media;
import net.eyelock.productlocator.model.MediaDataOnDemand;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

privileged aspect ArticleDataOnDemand_Roo_DataOnDemand {
    
    declare @type: ArticleDataOnDemand: @Component;
    
    private Random ArticleDataOnDemand.rnd = new SecureRandom();
    
    private List<Article> ArticleDataOnDemand.data;
    
    @Autowired
    private MediaDataOnDemand ArticleDataOnDemand.mediaDataOnDemand;
    
    public Article ArticleDataOnDemand.getNewTransientArticle(int index) {
        Article obj = new Article();
        setCode(obj, index);
        setIcon(obj, index);
        setImage(obj, index);
        setListable(obj, index);
        setName(obj, index);
        setOrderedBy(obj, index);
        return obj;
    }
    
    public void ArticleDataOnDemand.setCode(Article obj, int index) {
        String code = "code_" + index;
        if (code.length() > 10) {
            code = new Random().nextInt(10) + code.substring(1, 10);
        }
        obj.setCode(code);
    }
    
    public void ArticleDataOnDemand.setIcon(Article obj, int index) {
        Media icon = mediaDataOnDemand.getSpecificMedia(index);
        obj.setIcon(icon);
    }
    
    public void ArticleDataOnDemand.setImage(Article obj, int index) {
        Media image = mediaDataOnDemand.getSpecificMedia(index);
        obj.setImage(image);
    }
    
    public void ArticleDataOnDemand.setListable(Article obj, int index) {
        Boolean listable = Boolean.TRUE;
        obj.setListable(listable);
    }
    
    public void ArticleDataOnDemand.setName(Article obj, int index) {
        String name = "name_" + index;
        if (name.length() > 100) {
            name = name.substring(0, 100);
        }
        obj.setName(name);
    }
    
    public void ArticleDataOnDemand.setOrderedBy(Article obj, int index) {
        int orderedBy = 0;
        obj.setOrderedBy(orderedBy);
    }
    
    public Article ArticleDataOnDemand.getSpecificArticle(int index) {
        init();
        if (index < 0) {
            index = 0;
        }
        if (index > (data.size() - 1)) {
            index = data.size() - 1;
        }
        Article obj = data.get(index);
        Long id = obj.getId();
        return Article.findArticle(id);
    }
    
    public Article ArticleDataOnDemand.getRandomArticle() {
        init();
        Article obj = data.get(rnd.nextInt(data.size()));
        Long id = obj.getId();
        return Article.findArticle(id);
    }
    
    public boolean ArticleDataOnDemand.modifyArticle(Article obj) {
        return false;
    }
    
    public void ArticleDataOnDemand.init() {
        int from = 0;
        int to = 10;
        data = Article.findArticleEntries(from, to);
        if (data == null) {
            throw new IllegalStateException("Find entries implementation for 'Article' illegally returned null");
        }
        if (!data.isEmpty()) {
            return;
        }
        
        data = new ArrayList<Article>();
        for (int i = 0; i < 10; i++) {
            Article obj = getNewTransientArticle(i);
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
