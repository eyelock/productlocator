package net.eyelock.productlocator.controllers.web;

import net.eyelock.productlocator.model.Product;
import org.springframework.roo.addon.web.mvc.controller.finder.RooWebFinder;
import org.springframework.roo.addon.web.mvc.controller.json.RooWebJson;
import org.springframework.roo.addon.web.mvc.controller.scaffold.RooWebScaffold;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@RequestMapping("/products")
@Controller
@RooWebScaffold(path = "products", formBackingObject = Product.class)
@RooWebJson(jsonObject = Product.class)
@RooWebFinder
public class ProductController {
}
