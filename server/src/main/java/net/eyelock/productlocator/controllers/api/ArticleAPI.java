package net.eyelock.productlocator.controllers.api;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import net.eyelock.productlocator.model.Article;
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
@RequestMapping("/api/articles")
public class ArticleAPI {
	@Autowired
	private JSONSerializerFactory jsonFactory;
	
	private JSONSerializer jsonSerializer = null;

	
	@RequestMapping(value = "/{id}")
	@ResponseBody
	public ResponseEntity<String> showJson(@PathVariable("id") Long id, HttpServletRequest request) {
        Article item = Article.findArticle(id);
        
        if (item == null) {
            return new ResponseEntity<String>(jsonFactory.createJSONHTTPHeaders(), HttpStatus.NOT_FOUND);
        } 
        
        MediaAPI.populateMediaURLs(item, request);
        
        return new ResponseEntity<String>(getJSONSerializer().serialize(item), jsonFactory.createJSONHTTPHeaders(), HttpStatus.OK);
	}
	

	@RequestMapping()
	@ResponseBody
	public ResponseEntity<String> listJson(HttpServletRequest request) {
        List<Article> result = Article.findAllArticles(); 
        
        MediaAPI.populateMediaURLs(result, request);
        
        return new ResponseEntity<String>(getJSONSerializer().serialize(result), jsonFactory.createJSONHTTPHeaders(), HttpStatus.OK);
	}
	
	
	protected JSONSerializer getJSONSerializer() {
		if (jsonSerializer == null) {
			jsonSerializer = jsonFactory.createIconAndImageURLOnlyInstance()
										.include("contentBlocks")
										.exclude("*.article")
										.include("icon")
										.include("image");
		}
		
		return jsonSerializer;
	}
}
