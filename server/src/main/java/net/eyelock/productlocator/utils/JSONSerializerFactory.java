package net.eyelock.productlocator.utils;

import org.springframework.context.annotation.Scope;
import org.springframework.http.HttpHeaders;
import org.springframework.stereotype.Component;

import flexjson.JSONSerializer;

@Scope(value="prototype")
@Component
public class JSONSerializerFactory {
	public JSONSerializer createAPIInstance() {
		return new JSONSerializer().prettyPrint(true)
									.exclude("*.class")
									.exclude("*.version");
		
	}
	
	public JSONSerializer createIconAndImageURLOnlyInstance() {
		return createAPIInstance()
					.exclude("*.icon.name").exclude("*.image.name")
					.exclude("*.icon.description").exclude("*.image.description")
					.exclude("*.icon.fileName").exclude("*.image.fileName")
					.exclude("*.icon.mimeType").exclude("*.image.mimeType")
					.exclude("*.icon.size").exclude("*.image.size")
					.exclude("*.icon.content").exclude("*.image.content")
					;
		
	}
	
	public HttpHeaders createJSONHTTPHeaders() {
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Type", "application/json; charset=utf-8");
        return headers;
	}
}
