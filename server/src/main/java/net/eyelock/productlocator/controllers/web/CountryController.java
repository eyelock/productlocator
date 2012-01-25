package net.eyelock.productlocator.controllers.web;

import net.eyelock.productlocator.model.Country;
import org.springframework.roo.addon.web.mvc.controller.finder.RooWebFinder;
import org.springframework.roo.addon.web.mvc.controller.json.RooWebJson;
import org.springframework.roo.addon.web.mvc.controller.scaffold.RooWebScaffold;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@RequestMapping("/countries")
@Controller
@RooWebScaffold(path = "countries", formBackingObject = Country.class)
@RooWebJson(jsonObject = Country.class)
@RooWebFinder
public class CountryController {
}
