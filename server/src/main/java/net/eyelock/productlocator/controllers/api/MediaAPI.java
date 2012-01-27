package net.eyelock.productlocator.controllers.api;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.lang.reflect.Modifier;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import net.eyelock.productlocator.model.Media;

import org.apache.commons.io.IOUtils;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
@RequestMapping("/api/media")
public class MediaAPI {
	public static final String SHOW_MEDIA_PATH = "/api/media";

	@RequestMapping(value = "/{id}", method = RequestMethod.GET)
	public String showMedia(@PathVariable("id") Long id,
			HttpServletResponse response, Model model) {
		Media media = Media.findMedia(id);

		try {
			response.setHeader("Content-Disposition", "inline;filename=\""
					+ media.getFileName() + "\"");

			OutputStream out = response.getOutputStream();
			response.setContentType(media.getMimeType());
			IOUtils.copy(new ByteArrayInputStream(media.getContent()), out);
			out.flush();

		} catch (IOException e) {
			e.printStackTrace();
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}
	
	
	public static void populateMediaURLs(Object item, HttpServletRequest request) {
		for( Method method : item.getClass().getDeclaredMethods() ) {
            int modifiers = method.getModifiers();
            if( Modifier.isStatic(modifiers) ) continue;

            //TODO Could check the getReturnType of the method to check if it is a Media            
            
            int numberOfArgs = method.getParameterTypes().length;
            String name = method.getName();
            
            if( numberOfArgs == 0 && name.startsWith("get") ) {
            	Object value = null;
            	
				try {
					value = method.invoke(item, new Object[0]);
				} catch (IllegalArgumentException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				} catch (IllegalAccessException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				} catch (InvocationTargetException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
				
            	if (value != null && value instanceof Media) {
            		Media media = (Media) value;
            		media.setUrl(media.getMediaAPIURL(request));
            	}
            }
		}		
	}
	
	public static void populateMediaURLs(@SuppressWarnings("rawtypes") List collection, HttpServletRequest request) {
		for (Object item : collection) {
			populateMediaURLs(item, request);
		}		
	}
}
