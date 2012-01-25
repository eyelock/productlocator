package net.eyelock.productlocator.controllers.web;

import net.eyelock.productlocator.model.ContentBlock;
import org.springframework.roo.addon.web.mvc.controller.finder.RooWebFinder;
import org.springframework.roo.addon.web.mvc.controller.json.RooWebJson;
import org.springframework.roo.addon.web.mvc.controller.scaffold.RooWebScaffold;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@RequestMapping("/contentblocks")
@Controller
@RooWebScaffold(path = "contentblocks", formBackingObject = ContentBlock.class)
@RooWebJson(jsonObject = ContentBlock.class)
@RooWebFinder
public class ContentBlockController {
}
