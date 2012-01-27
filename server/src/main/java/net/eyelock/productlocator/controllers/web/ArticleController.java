package net.eyelock.productlocator.controllers.web;

import net.eyelock.productlocator.model.Article;

import org.springframework.roo.addon.web.mvc.controller.finder.RooWebFinder;
import org.springframework.roo.addon.web.mvc.controller.scaffold.RooWebScaffold;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@RequestMapping("/articles")
@Controller
@RooWebScaffold(path = "articles", formBackingObject = Article.class)
@RooWebFinder
public class ArticleController {
}
