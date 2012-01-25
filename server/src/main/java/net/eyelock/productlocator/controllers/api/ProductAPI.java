package net.eyelock.productlocator.controllers.api;

import net.eyelock.productlocator.controllers.web.ProductController;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequestMapping("/api/products")
public class ProductAPI {
    private final ProductController controller;
    
    @Autowired
    public ProductAPI(ProductController controller) {
        this.controller = controller;
    }
    
    @RequestMapping(value = "/{id}")
    @ResponseBody
    public ResponseEntity<String> showJson(@PathVariable("id") Long id) {
        return this.controller.showJson(id);
    }
    
    @RequestMapping()
    @ResponseBody
    public ResponseEntity<String> listJson() {
        return this.controller.listJson();
    }
}
