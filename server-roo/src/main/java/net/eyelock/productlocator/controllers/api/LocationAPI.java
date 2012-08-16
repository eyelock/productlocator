package net.eyelock.productlocator.controllers.api;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.TypedQuery;
import javax.servlet.http.HttpServletRequest;

import net.eyelock.productlocator.model.Location;
import net.eyelock.productlocator.model.Product;
import net.eyelock.productlocator.utils.JSONSerializerFactory;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import flexjson.JSONSerializer;

@Controller
@RequestMapping("/api/locations")
public class LocationAPI {
	@Autowired
	private JSONSerializerFactory jsonFactory;
	
	private JSONSerializer jsonSerializer = null;
	private JSONSerializer productsJsonSerializer = null;

    
    @RequestMapping(value = "/{id}")
    @ResponseBody
    public ResponseEntity<String> showJson(@PathVariable("id") Long id, HttpServletRequest request) {
        Location item = Location.findLocation(id);
        
        if (item == null) {
            return new ResponseEntity<String>(jsonFactory.createJSONHTTPHeaders(), HttpStatus.NOT_FOUND);
        } 
        
        MediaAPI.populateMediaURLs(item, request);
        
        return new ResponseEntity<String>(getJSONSerializer().serialize(item), jsonFactory.createJSONHTTPHeaders(), HttpStatus.OK);
    }
    
    @RequestMapping(value = "/{id}/products")
    @ResponseBody
    public ResponseEntity<String> showProductsJson(@PathVariable("id") Long id, HttpServletRequest request) {
        List<Product> products = new ArrayList<Product>();
        Location item = Location.findLocation(id);
        
        if (item == null) {
            return new ResponseEntity<String>(jsonFactory.createJSONHTTPHeaders(), HttpStatus.NOT_FOUND);
        }  
        
        //Add all the products listed as stocked at this location
        products.addAll(item.getProducts());
        
        //Get all the products that are listed as stocked everywhere
        TypedQuery<Product> stockedEverywhereProducts = Product.findProductsByAvailableEverywhereNot(false);
        for (Product product : stockedEverywhereProducts.getResultList()) {
        	if (!products.contains(product)) {
        		products.add(product);
        	}
        }
        
        return new ResponseEntity<String>(getProductsJSONSerializer().serialize(products), jsonFactory.createJSONHTTPHeaders(), HttpStatus.OK);
    }
    
    
    @RequestMapping()
    @ResponseBody
    public ResponseEntity<String> listJson(HttpServletRequest request) {
        List<Location> result = Location.findAllLocations();
        
        MediaAPI.populateMediaURLs(result, request);
        
        return new ResponseEntity<String>(getJSONSerializer().serialize(result), jsonFactory.createJSONHTTPHeaders(), HttpStatus.OK);
    }

	
	protected JSONSerializer getJSONSerializer() {
		if (jsonSerializer == null) {
			jsonSerializer = jsonFactory.createIconAndImageURLOnlyInstance()
								.exclude("country.name")
								.exclude("country.code")
								.exclude("country.active")
								.exclude("products");
		}
		
		return jsonSerializer;
	}
	
	
	protected JSONSerializer getProductsJSONSerializer() {
		if (productsJsonSerializer == null) {
			productsJsonSerializer = jsonFactory.createAPIInstance()
					.include("id")
					.exclude("*");
		}
		
		return productsJsonSerializer;
	}
}
