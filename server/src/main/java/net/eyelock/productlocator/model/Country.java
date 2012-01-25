package net.eyelock.productlocator.model;

import javax.persistence.Column;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import org.springframework.context.annotation.Scope;
import org.springframework.roo.addon.javabean.RooJavaBean;
import org.springframework.roo.addon.jpa.activerecord.RooJpaActiveRecord;
import org.springframework.roo.addon.json.RooJson;
import org.springframework.roo.addon.plural.RooPlural;
import org.springframework.roo.addon.tostring.RooToString;
import org.springframework.stereotype.Component;

@Component
@Scope("prototype")
@Table(name="countries")
@RooPlural("Countries")
@RooJavaBean
@RooToString
@RooJson
@RooJpaActiveRecord(finders = { "findCountriesByCodeEquals",
		"findCountriesByNameEquals", "findCountriesByNameLike" })
public class Country {

	@Column(unique = true, nullable = false, name="code")
	@NotNull
	@Size(min = 2)
	private String code;

	@NotNull
	@Size(min = 2)
	@Column(name="name")
	private String name;

	@Column(name="active")
	private Boolean active;

	public void copyInto(net.eyelock.productlocator.model.Country copy) {
		this.setCode(copy.getCode());
		this.setName(copy.getName());
		this.setActive(copy.getActive());
	}
}
