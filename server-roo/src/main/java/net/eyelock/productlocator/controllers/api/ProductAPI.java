package net.eyelock.productlocator.controllers.api;

import java.util.ArrayList;
import java.util.List;

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
@RequestMapping("/api/products")
public class ProductAPI {
	@Autowired
	private JSONSerializerFactory jsonFactory;
	
	private JSONSerializer jsonSerializer = null;
	private JSONSerializer locationsJsonSerializer = null;

    
    @RequestMapping(value = "/{id}")
    @ResponseBody
    public ResponseEntity<String> showJson(@PathVariable("id") Long id, HttpServletRequest request) {
    	Product item = Product.findProduct(id);
        
        if (item == null) {
            return new ResponseEntity<String>(jsonFactory.createJSONHTTPHeaders(), HttpStatus.NOT_FOUND);
        } 
        
        MediaAPI.populateMediaURLs(item, request);
        
        return new ResponseEntity<String>(getJSONSerializer().serialize(item), jsonFactory.createJSONHTTPHeaders(), HttpStatus.OK);
    }
    
    @RequestMapping(value = "/{id}/locations")
    @ResponseBody
    public ResponseEntity<String> showLocationsJson(@PathVariable("id") Long id, HttpServletRequest request) {
        List<Location> locations = new ArrayList<Location>();
        Product item = Product.findProduct(id);
        
        if (item == null) {
            return new ResponseEntity<String>(jsonFactory.createJSONHTTPHeaders(), HttpStatus.NOT_FOUND);
        }  
        
        //Check and see if this proudct is stocked everywhere
        if (!item.getAvailableEverywhere()) {
        	locations.addAll(item.getLocations());
        } else {
        	locations.addAll(Location.findAllLocations());
        }
        
        return new ResponseEntity<String>(getLocationsJSONSerializer().serialize(locations), jsonFactory.createJSONHTTPHeaders(), HttpStatus.OK);
    }
    
    @RequestMapping()
    @ResponseBody
    public ResponseEntity<String> listJson(HttpServletRequest request) {
        List<Product> result = Product.findAllProducts();
        
        MediaAPI.populateMediaURLs(result, request);
        
        return new ResponseEntity<String>(getJSONSerializer().serialize(result), jsonFactory.createJSONHTTPHeaders(), HttpStatus.OK);
    }

	
	protected JSONSerializer getJSONSerializer() {
		if (jsonSerializer == null) {
			jsonSerializer = jsonFactory.createIconAndImageURLOnlyInstance()
								.exclude("skus")
								.exclude("locations");
		}
		
		return jsonSerializer;
	}
	
	
	protected JSONSerializer getLocationsJSONSerializer() {
		if (locationsJsonSerializer == null) {
			locationsJsonSerializer = jsonFactory.createAPIInstance()
							.include("id")
							.include("country.id")
							.exclude("*");
				
		}
		
		return locationsJsonSerializer;
	}
}
