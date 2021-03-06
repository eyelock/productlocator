// WARNING: DO NOT EDIT THIS FILE. THIS FILE IS MANAGED BY SPRING ROO.
// You may push code into the target .java compilation unit if you wish to edit any member(s).

package net.eyelock.productlocator.controllers.web;

import java.io.UnsupportedEncodingException;
import java.util.Arrays;
import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import net.eyelock.productlocator.controllers.web.ContentBlockController;
import net.eyelock.productlocator.model.Article;
import net.eyelock.productlocator.model.ContentBlock;
import net.eyelock.productlocator.model.ContentBlockType;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.util.UriUtils;
import org.springframework.web.util.WebUtils;

privileged aspect ContentBlockController_Roo_Controller {
    
    @RequestMapping(method = RequestMethod.POST, produces = "text/html")
    public String ContentBlockController.create(@Valid ContentBlock contentBlock, BindingResult bindingResult, Model uiModel, HttpServletRequest httpServletRequest) {
        if (bindingResult.hasErrors()) {
            populateEditForm(uiModel, contentBlock);
            return "contentblocks/create";
        }
        uiModel.asMap().clear();
        contentBlock.persist();
        return "redirect:/contentblocks/" + encodeUrlPathSegment(contentBlock.getId().toString(), httpServletRequest);
    }
    
    @RequestMapping(params = "form", produces = "text/html")
    public String ContentBlockController.createForm(Model uiModel) {
        populateEditForm(uiModel, new ContentBlock());
        return "contentblocks/create";
    }
    
    @RequestMapping(value = "/{id}", produces = "text/html")
    public String ContentBlockController.show(@PathVariable("id") Long id, Model uiModel) {
        uiModel.addAttribute("contentblock", ContentBlock.findContentBlock(id));
        uiModel.addAttribute("itemId", id);
        return "contentblocks/show";
    }
    
    @RequestMapping(produces = "text/html")
    public String ContentBlockController.list(@RequestParam(value = "page", required = false) Integer page, @RequestParam(value = "size", required = false) Integer size, Model uiModel) {
        if (page != null || size != null) {
            int sizeNo = size == null ? 10 : size.intValue();
            final int firstResult = page == null ? 0 : (page.intValue() - 1) * sizeNo;
            uiModel.addAttribute("contentblocks", ContentBlock.findContentBlockEntries(firstResult, sizeNo));
            float nrOfPages = (float) ContentBlock.countContentBlocks() / sizeNo;
            uiModel.addAttribute("maxPages", (int) ((nrOfPages > (int) nrOfPages || nrOfPages == 0.0) ? nrOfPages + 1 : nrOfPages));
        } else {
            uiModel.addAttribute("contentblocks", ContentBlock.findAllContentBlocks());
        }
        return "contentblocks/list";
    }
    
    @RequestMapping(method = RequestMethod.PUT, produces = "text/html")
    public String ContentBlockController.update(@Valid ContentBlock contentBlock, BindingResult bindingResult, Model uiModel, HttpServletRequest httpServletRequest) {
        if (bindingResult.hasErrors()) {
            populateEditForm(uiModel, contentBlock);
            return "contentblocks/update";
        }
        uiModel.asMap().clear();
        contentBlock.merge();
        return "redirect:/contentblocks/" + encodeUrlPathSegment(contentBlock.getId().toString(), httpServletRequest);
    }
    
    @RequestMapping(value = "/{id}", params = "form", produces = "text/html")
    public String ContentBlockController.updateForm(@PathVariable("id") Long id, Model uiModel) {
        populateEditForm(uiModel, ContentBlock.findContentBlock(id));
        return "contentblocks/update";
    }
    
    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE, produces = "text/html")
    public String ContentBlockController.delete(@PathVariable("id") Long id, @RequestParam(value = "page", required = false) Integer page, @RequestParam(value = "size", required = false) Integer size, Model uiModel) {
        ContentBlock contentBlock = ContentBlock.findContentBlock(id);
        contentBlock.remove();
        uiModel.asMap().clear();
        uiModel.addAttribute("page", (page == null) ? "1" : page.toString());
        uiModel.addAttribute("size", (size == null) ? "10" : size.toString());
        return "redirect:/contentblocks";
    }
    
    void ContentBlockController.populateEditForm(Model uiModel, ContentBlock contentBlock) {
        uiModel.addAttribute("contentBlock", contentBlock);
        uiModel.addAttribute("articles", Article.findAllArticles());
        uiModel.addAttribute("contentblocktypes", Arrays.asList(ContentBlockType.values()));
    }
    
    String ContentBlockController.encodeUrlPathSegment(String pathSegment, HttpServletRequest httpServletRequest) {
        String enc = httpServletRequest.getCharacterEncoding();
        if (enc == null) {
            enc = WebUtils.DEFAULT_CHARACTER_ENCODING;
        }
        try {
            pathSegment = UriUtils.encodePathSegment(pathSegment, enc);
        } catch (UnsupportedEncodingException uee) {}
        return pathSegment;
    }
    
}
