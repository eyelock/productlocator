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
import net.eyelock.productlocator.model.Country;
import net.eyelock.productlocator.model.CountryDataOnDemand;
import net.eyelock.productlocator.model.Location;
import net.eyelock.productlocator.model.LocationDataOnDemand;
import net.eyelock.productlocator.model.Media;
import net.eyelock.productlocator.model.MediaDataOnDemand;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

privileged aspect LocationDataOnDemand_Roo_DataOnDemand {
    
    declare @type: LocationDataOnDemand: @Component;
    
    private Random LocationDataOnDemand.rnd = new SecureRandom();
    
    private List<Location> LocationDataOnDemand.data;
    
    @Autowired
    private CountryDataOnDemand LocationDataOnDemand.countryDataOnDemand;
    
    @Autowired
    private MediaDataOnDemand LocationDataOnDemand.mediaDataOnDemand;
    
    public Location LocationDataOnDemand.getNewTransientLocation(int index) {
        Location obj = new Location();
        setActive(obj, index);
        setAddress01(obj, index);
        setAddress02(obj, index);
        setCity(obj, index);
        setCountry(obj, index);
        setDescription(obj, index);
        setEmail(obj, index);
        setIcon(obj, index);
        setImage(obj, index);
        setLatitude(obj, index);
        setLongitude(obj, index);
        setName(obj, index);
        setPhone(obj, index);
        setPostcode(obj, index);
        setTwitter(obj, index);
        setUrl(obj, index);
        return obj;
    }
    
    public void LocationDataOnDemand.setActive(Location obj, int index) {
        Boolean active = Boolean.TRUE;
        obj.setActive(active);
    }
    
    public void LocationDataOnDemand.setAddress01(Location obj, int index) {
        String address01 = "address01_" + index;
        if (address01.length() > 100) {
            address01 = address01.substring(0, 100);
        }
        obj.setAddress01(address01);
    }
    
    public void LocationDataOnDemand.setAddress02(Location obj, int index) {
        String address02 = "address02_" + index;
        if (address02.length() > 100) {
            address02 = address02.substring(0, 100);
        }
        obj.setAddress02(address02);
    }
    
    public void LocationDataOnDemand.setCity(Location obj, int index) {
        String city = "city_" + index;
        if (city.length() > 100) {
            city = city.substring(0, 100);
        }
        obj.setCity(city);
    }
    
    public void LocationDataOnDemand.setCountry(Location obj, int index) {
        Country country = countryDataOnDemand.getRandomCountry();
        obj.setCountry(country);
    }
    
    public void LocationDataOnDemand.setDescription(Location obj, int index) {
        String description = "description_" + index;
        if (description.length() > 1000) {
            description = description.substring(0, 1000);
        }
        obj.setDescription(description);
    }
    
    public void LocationDataOnDemand.setEmail(Location obj, int index) {
        String email = "foo" + index + "@bar.com";
        if (email.length() > 255) {
            email = email.substring(0, 255);
        }
        obj.setEmail(email);
    }
    
    public void LocationDataOnDemand.setIcon(Location obj, int index) {
        Media icon = mediaDataOnDemand.getSpecificMedia(index);
        obj.setIcon(icon);
    }
    
    public void LocationDataOnDemand.setImage(Location obj, int index) {
        Media image = mediaDataOnDemand.getSpecificMedia(index);
        obj.setImage(image);
    }
    
    public void LocationDataOnDemand.setLatitude(Location obj, int index) {
        Float latitude = new Integer(index).floatValue();
        obj.setLatitude(latitude);
    }
    
    public void LocationDataOnDemand.setLongitude(Location obj, int index) {
        Float longitude = new Integer(index).floatValue();
        obj.setLongitude(longitude);
    }
    
    public void LocationDataOnDemand.setName(Location obj, int index) {
        String name = "name_" + index;
        obj.setName(name);
    }
    
    public void LocationDataOnDemand.setPhone(Location obj, int index) {
        String phone = "phone_" + index;
        if (phone.length() > 20) {
            phone = phone.substring(0, 20);
        }
        obj.setPhone(phone);
    }
    
    public void LocationDataOnDemand.setPostcode(Location obj, int index) {
        String postcode = "postcode_" + index;
        if (postcode.length() > 10) {
            postcode = postcode.substring(0, 10);
        }
        obj.setPostcode(postcode);
    }
    
    public void LocationDataOnDemand.setTwitter(Location obj, int index) {
        String twitter = "twitter_" + index;
        if (twitter.length() > 35) {
            twitter = twitter.substring(0, 35);
        }
        obj.setTwitter(twitter);
    }
    
    public void LocationDataOnDemand.setUrl(Location obj, int index) {
        String url = "url_" + index;
        if (url.length() > 255) {
            url = url.substring(0, 255);
        }
        obj.setUrl(url);
    }
    
    public Location LocationDataOnDemand.getSpecificLocation(int index) {
        init();
        if (index < 0) {
            index = 0;
        }
        if (index > (data.size() - 1)) {
            index = data.size() - 1;
        }
        Location obj = data.get(index);
        Long id = obj.getId();
        return Location.findLocation(id);
    }
    
    public Location LocationDataOnDemand.getRandomLocation() {
        init();
        Location obj = data.get(rnd.nextInt(data.size()));
        Long id = obj.getId();
        return Location.findLocation(id);
    }
    
    public boolean LocationDataOnDemand.modifyLocation(Location obj) {
        return false;
    }
    
    public void LocationDataOnDemand.init() {
        int from = 0;
        int to = 10;
        data = Location.findLocationEntries(from, to);
        if (data == null) {
            throw new IllegalStateException("Find entries implementation for 'Location' illegally returned null");
        }
        if (!data.isEmpty()) {
            return;
        }
        
        data = new ArrayList<Location>();
        for (int i = 0; i < 10; i++) {
            Location obj = getNewTransientLocation(i);
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
