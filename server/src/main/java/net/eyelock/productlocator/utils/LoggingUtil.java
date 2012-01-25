package net.eyelock.productlocator.utils;

import org.apache.log4j.Logger;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

@Scope(value="singleton")
@Component
public class LoggingUtil {
	public Logger getLogger(String name)
	{
		return Logger.getLogger(name);
	}
	
	@SuppressWarnings("rawtypes")
	public Logger getLogger(Class clazz)
	{
		return Logger.getLogger(clazz);
	}
}
