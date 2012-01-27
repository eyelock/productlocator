package net.eyelock.productlocator.controllers.api;

import java.util.List;

import net.eyelock.productlocator.model.Location;
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

    
    @RequestMapping(value = "/{id}")
    @ResponseBody
    public ResponseEntity<String> showJson(@PathVariable("id") Long id) {
        Location item = Location.findLocation(id);
        
        if (item == null) {
            return new ResponseEntity<String>(jsonFactory.createJSONHTTPHeaders(), HttpStatus.NOT_FOUND);
        } 
        
        return new ResponseEntity<String>(getJSONSerializer().serialize(item), jsonFactory.createJSONHTTPHeaders(), HttpStatus.OK);
    }
    
    @RequestMapping()
    @ResponseBody
    public ResponseEntity<String> listJson() {
        List<Location> result = Location.findAllLocations();
        
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
}
