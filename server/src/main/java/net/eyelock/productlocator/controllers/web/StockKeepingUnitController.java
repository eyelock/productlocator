package net.eyelock.productlocator.controllers.web;

import net.eyelock.productlocator.model.StockKeepingUnit;

import org.springframework.roo.addon.web.mvc.controller.finder.RooWebFinder;
import org.springframework.roo.addon.web.mvc.controller.scaffold.RooWebScaffold;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@RequestMapping("/stockkeepingunits")
@Controller
@RooWebScaffold(path = "stockkeepingunits", formBackingObject = StockKeepingUnit.class)
@RooWebFinder
public class StockKeepingUnitController {
}
