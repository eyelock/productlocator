package net.eyelock.productlocator.controllers.web;

import net.eyelock.productlocator.model.Location;
import org.springframework.roo.addon.web.mvc.controller.finder.RooWebFinder;
import org.springframework.roo.addon.web.mvc.controller.json.RooWebJson;
import org.springframework.roo.addon.web.mvc.controller.scaffold.RooWebScaffold;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@RequestMapping("/locations")
@Controller
@RooWebScaffold(path = "locations", formBackingObject = Location.class)
@RooWebJson(jsonObject = Location.class)
@RooWebFinder
public class LocationController {
}
