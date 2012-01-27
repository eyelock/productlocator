package net.eyelock.productlocator.model;

import java.util.HashSet;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.persistence.Transient;
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
@Scope(value = "prototype")
@Table(name="locations")
@RooPlural("Locations")
@RooJavaBean
@RooToString
@RooJson
@RooJpaActiveRecord(finders = { "findLocationsByCountry",
		"findLocationsByActiveNot", "findLocationsByCityEquals",
		"findLocationsByCityLike", "findLocationsByPostcodeLike",
		"findLocationsByNameLike", "findLocationsByNameEquals",
		"findLocationsByActiveNot" })
public class Location {

	@NotNull
	@Size(min = 2)
	@Column(name="name")
	private String name;

	@Size(max = 1000)
	@Column(name="description")
	private String description;

	@NotNull
	@Size(min = 5, max = 100)
	@Column(name="address01")
	private String address01;

	@Size(min = 5, max = 100)
	@Column(name="address02")
	private String address02;

	@NotNull
	@Size(min = 2, max = 100)
	@Column(name="city")
	private String city;

	@Size(min = 2, max = 10)
	@Column(name="postcode")
	private String postcode;

	@ManyToOne
	@JoinColumn(name="country_id", nullable=false)
	private Country country;

	@OneToOne(optional=true)
	@JoinColumn(name="icon_media_id", unique=true, nullable=true, updatable=false)
	private Media icon;

	@OneToOne(optional=true)
	@JoinColumn(name="image_media_id", unique=true, nullable=true, updatable=false)
	private Media image;

	@Size(max = 255)
	@Column(name="url")
	private String url;

	@Size(max = 255)
	@Column(name="email")
	private String email;

	@Size(max = 20)
	@Column(name="phone")
	private String phone;

	@Size(max = 35)
	@Column(name="twitter")
	private String twitter;

	@Column(name="latitude")
	private Float latitude;

	@Column(name="longitude")
	private Float longitude;

	@Column(name="active")
	private Boolean active;

	@ManyToMany(cascade = CascadeType.ALL, mappedBy="locations")
	private Set<Product> products = new HashSet<Product>();
}
