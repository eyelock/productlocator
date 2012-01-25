// WARNING: DO NOT EDIT THIS FILE. THIS FILE IS MANAGED BY SPRING ROO.
// You may push code into the target .java compilation unit if you wish to edit any member(s).

package net.eyelock.productlocator.controllers.web;

import java.util.List;
import net.eyelock.productlocator.controllers.web.ArticleController;
import net.eyelock.productlocator.model.Article;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

privileged aspect ArticleController_Roo_Controller_Json {
    
    @RequestMapping(value = "/{id}", headers = "Accept=application/json")
    @ResponseBody
    public ResponseEntity<String> ArticleController.showJson(@PathVariable("id") Long id) {
        Article article = Article.findArticle(id);
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Type", "application/json; charset=utf-8");
        if (article == null) {
            return new ResponseEntity<String>(headers, HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<String>(article.toJson(), headers, HttpStatus.OK);
    }
    
    @RequestMapping(headers = "Accept=application/json")
    @ResponseBody
    public ResponseEntity<String> ArticleController.listJson() {
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Type", "application/json; charset=utf-8");
        List<Article> result = Article.findAllArticles();
        return new ResponseEntity<String>(Article.toJsonArray(result), headers, HttpStatus.OK);
    }
    
    @RequestMapping(method = RequestMethod.POST, headers = "Accept=application/json")
    public ResponseEntity<String> ArticleController.createFromJson(@RequestBody String json) {
        Article article = Article.fromJsonToArticle(json);
        article.persist();
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Type", "application/json");
        return new ResponseEntity<String>(headers, HttpStatus.CREATED);
    }
    
    @RequestMapping(value = "/jsonArray", method = RequestMethod.POST, headers = "Accept=application/json")
    public ResponseEntity<String> ArticleController.createFromJsonArray(@RequestBody String json) {
        for (Article article: Article.fromJsonArrayToArticles(json)) {
            article.persist();
        }
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Type", "application/json");
        return new ResponseEntity<String>(headers, HttpStatus.CREATED);
    }
    
    @RequestMapping(method = RequestMethod.PUT, headers = "Accept=application/json")
    public ResponseEntity<String> ArticleController.updateFromJson(@RequestBody String json) {
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Type", "application/json");
        Article article = Article.fromJsonToArticle(json);
        if (article.merge() == null) {
            return new ResponseEntity<String>(headers, HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<String>(headers, HttpStatus.OK);
    }
    
    @RequestMapping(value = "/jsonArray", method = RequestMethod.PUT, headers = "Accept=application/json")
    public ResponseEntity<String> ArticleController.updateFromJsonArray(@RequestBody String json) {
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Type", "application/json");
        for (Article article: Article.fromJsonArrayToArticles(json)) {
            if (article.merge() == null) {
                return new ResponseEntity<String>(headers, HttpStatus.NOT_FOUND);
            }
        }
        return new ResponseEntity<String>(headers, HttpStatus.OK);
    }
    
    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE, headers = "Accept=application/json")
    public ResponseEntity<String> ArticleController.deleteFromJson(@PathVariable("id") Long id) {
        Article article = Article.findArticle(id);
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Type", "application/json");
        if (article == null) {
            return new ResponseEntity<String>(headers, HttpStatus.NOT_FOUND);
        }
        article.remove();
        return new ResponseEntity<String>(headers, HttpStatus.OK);
    }
    
    @RequestMapping(params = "find=ByCodeEquals", headers = "Accept=application/json")
    @ResponseBody
    public ResponseEntity<String> ArticleController.jsonFindArticlesByCodeEquals(@RequestParam("code") String code) {
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Type", "application/json; charset=utf-8");
        return new ResponseEntity<String>(Article.toJsonArray(Article.findArticlesByCodeEquals(code).getResultList()), headers, HttpStatus.OK);
    }
    
    @RequestMapping(params = "find=ByCodeLike", headers = "Accept=application/json")
    @ResponseBody
    public ResponseEntity<String> ArticleController.jsonFindArticlesByCodeLike(@RequestParam("code") String code) {
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Type", "application/json; charset=utf-8");
        return new ResponseEntity<String>(Article.toJsonArray(Article.findArticlesByCodeLike(code).getResultList()), headers, HttpStatus.OK);
    }
    
    @RequestMapping(params = "find=ByListableNot", headers = "Accept=application/json")
    @ResponseBody
    public ResponseEntity<String> ArticleController.jsonFindArticlesByListableNot(@RequestParam(value = "listable", required = false) Boolean listable) {
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Type", "application/json; charset=utf-8");
        return new ResponseEntity<String>(Article.toJsonArray(Article.findArticlesByListableNot(listable == null ? Boolean.FALSE : listable).getResultList()), headers, HttpStatus.OK);
    }
    
    @RequestMapping(params = "find=ByNameEquals", headers = "Accept=application/json")
    @ResponseBody
    public ResponseEntity<String> ArticleController.jsonFindArticlesByNameEquals(@RequestParam("name") String name) {
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Type", "application/json; charset=utf-8");
        return new ResponseEntity<String>(Article.toJsonArray(Article.findArticlesByNameEquals(name).getResultList()), headers, HttpStatus.OK);
    }
    
}
