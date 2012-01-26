package net.eyelock.productlocator.controllers.api;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import net.eyelock.productlocator.model.Article;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import flexjson.JSONSerializer;

@Controller
@RequestMapping("/api/articles")
public class ArticleAPI {


	@RequestMapping(value = "/{id}")
	@ResponseBody
	public ResponseEntity<String> showJson(@PathVariable("id") Long id, HttpServletRequest request) {
        Article article = Article.findArticle(id);
        
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Type", "application/json; charset=utf-8");
        
        if (article == null) {
            return new ResponseEntity<String>(headers, HttpStatus.NOT_FOUND);
        } 
        
    	prepareLazySerialization(article, request);
        
        String jsonText  =  new JSONSerializer().prettyPrint(true)
        										.include("contentBlocks")
        										.exclude("*.class")
        										.exclude("*.article")
        										.exclude("*.version")	
												.include("icon")
												.include("image")
												.serialize(article);
        
        return new ResponseEntity<String>(jsonText, headers, HttpStatus.OK);
	}

	@RequestMapping()
	@ResponseBody
	public ResponseEntity<String> listJson(HttpServletRequest request) {
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Type", "application/json; charset=utf-8");
        
        List<Article> result = Article.findAllArticles();
        
        //fetch all the content blocks for each article
        for (Article article : result) {
        	prepareLazySerialization(article, request);
        }      
        
        String jsonText  =  new JSONSerializer().prettyPrint(true)
												.include("contentBlocks")
												.exclude("*.class")
												.exclude("*.article")
												.exclude("*.version")	
												.include("icon")
												.include("image")
					        					.serialize(result);
        
        return new ResponseEntity<String>(jsonText, headers, HttpStatus.OK);
	}
	
	
	protected void prepareLazySerialization(Article article, HttpServletRequest request) {
    	if (article.getIcon() != null)
    		article.setIcon(article.getIcon().toLazyBean(request));
    	
    	if (article.getImage() != null)
    		article.setImage(article.getImage().toLazyBean(request));
    	
    	article.getContentBlocks();
	}
}
