// WARNING: DO NOT EDIT THIS FILE. THIS FILE IS MANAGED BY SPRING ROO.
// You may push code into the target .java compilation unit if you wish to edit any member(s).

package net.eyelock.productlocator.controllers.web;

import net.eyelock.productlocator.controllers.web.LocationController;
import net.eyelock.productlocator.model.Country;
import net.eyelock.productlocator.model.Location;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

privileged aspect LocationController_Roo_Controller_Finder {
    
    @RequestMapping(params = { "find=ByActiveNot", "form" }, method = RequestMethod.GET)
    public String LocationController.findLocationsByActiveNotForm(Model uiModel) {
        return "locations/findLocationsByActiveNot";
    }
    
    @RequestMapping(params = "find=ByActiveNot", method = RequestMethod.GET)
    public String LocationController.findLocationsByActiveNot(@RequestParam(value = "active", required = false) Boolean active, Model uiModel) {
        uiModel.addAttribute("locations", Location.findLocationsByActiveNot(active == null ? Boolean.FALSE : active).getResultList());
        return "locations/list";
    }
    
    @RequestMapping(params = { "find=ByCityEquals", "form" }, method = RequestMethod.GET)
    public String LocationController.findLocationsByCityEqualsForm(Model uiModel) {
        return "locations/findLocationsByCityEquals";
    }
    
    @RequestMapping(params = "find=ByCityEquals", method = RequestMethod.GET)
    public String LocationController.findLocationsByCityEquals(@RequestParam("city") String city, Model uiModel) {
        uiModel.addAttribute("locations", Location.findLocationsByCityEquals(city).getResultList());
        return "locations/list";
    }
    
    @RequestMapping(params = { "find=ByCityLike", "form" }, method = RequestMethod.GET)
    public String LocationController.findLocationsByCityLikeForm(Model uiModel) {
        return "locations/findLocationsByCityLike";
    }
    
    @RequestMapping(params = "find=ByCityLike", method = RequestMethod.GET)
    public String LocationController.findLocationsByCityLike(@RequestParam("city") String city, Model uiModel) {
        uiModel.addAttribute("locations", Location.findLocationsByCityLike(city).getResultList());
        return "locations/list";
    }
    
    @RequestMapping(params = { "find=ByCountry", "form" }, method = RequestMethod.GET)
    public String LocationController.findLocationsByCountryForm(Model uiModel) {
        uiModel.addAttribute("countries", Country.findAllCountries());
        return "locations/findLocationsByCountry";
    }
    
    @RequestMapping(params = "find=ByCountry", method = RequestMethod.GET)
    public String LocationController.findLocationsByCountry(@RequestParam("country") Country country, Model uiModel) {
        uiModel.addAttribute("locations", Location.findLocationsByCountry(country).getResultList());
        return "locations/list";
    }
    
    @RequestMapping(params = { "find=ByNameEquals", "form" }, method = RequestMethod.GET)
    public String LocationController.findLocationsByNameEqualsForm(Model uiModel) {
        return "locations/findLocationsByNameEquals";
    }
    
    @RequestMapping(params = "find=ByNameEquals", method = RequestMethod.GET)
    public String LocationController.findLocationsByNameEquals(@RequestParam("name") String name, Model uiModel) {
        uiModel.addAttribute("locations", Location.findLocationsByNameEquals(name).getResultList());
        return "locations/list";
    }
    
    @RequestMapping(params = { "find=ByNameLike", "form" }, method = RequestMethod.GET)
    public String LocationController.findLocationsByNameLikeForm(Model uiModel) {
        return "locations/findLocationsByNameLike";
    }
    
    @RequestMapping(params = "find=ByNameLike", method = RequestMethod.GET)
    public String LocationController.findLocationsByNameLike(@RequestParam("name") String name, Model uiModel) {
        uiModel.addAttribute("locations", Location.findLocationsByNameLike(name).getResultList());
        return "locations/list";
    }
    
    @RequestMapping(params = { "find=ByPostcodeLike", "form" }, method = RequestMethod.GET)
    public String LocationController.findLocationsByPostcodeLikeForm(Model uiModel) {
        return "locations/findLocationsByPostcodeLike";
    }
    
    @RequestMapping(params = "find=ByPostcodeLike", method = RequestMethod.GET)
    public String LocationController.findLocationsByPostcodeLike(@RequestParam("postcode") String postcode, Model uiModel) {
        uiModel.addAttribute("locations", Location.findLocationsByPostcodeLike(postcode).getResultList());
        return "locations/list";
    }
    
}
