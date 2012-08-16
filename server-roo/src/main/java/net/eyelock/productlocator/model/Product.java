package net.eyelock.productlocator.model;

import java.util.HashSet;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import org.springframework.context.annotation.Scope;
import org.springframework.roo.addon.javabean.RooJavaBean;
import org.springframework.roo.addon.jpa.activerecord.RooJpaActiveRecord;
import org.springframework.roo.addon.plural.RooPlural;
import org.springframework.roo.addon.tostring.RooToString;
import org.springframework.stereotype.Component;

@Component
@Scope(value = "prototype")
@Table(name="products")
@RooPlural("Products")
@RooJavaBean
@RooToString
@RooJpaActiveRecord(finders = { "findProductsByActiveNot",
		"findProductsByAvailableEverywhereNot",
		"findProductsByDescriptionLike", "findProductsByNameEquals",
		"findProductsByNameLike" })
public class Product {

	@NotNull
	@Size(min = 2, max = 100)
	@Column(name="name")
	private String name;

	@Size(max = 255)
	@Column(name="teaser")
	private String teaser;

	@Size(max = 1000)
	@Column(name="description")
	private String description;

	@Column(name="ordered_by")
	private int orderedBy = 0;

	@ManyToOne(optional=true)
	@JoinColumn(name="icon_media_id", unique=false, nullable=true, updatable=true)
	private Media icon;

	@ManyToOne(optional=true)
	@JoinColumn(name="image_media_id", unique=false, nullable=true, updatable=true)
	private Media image;

	@Column(name="available_everywhere")
	private Boolean availableEverywhere;

	@Column(name="active")
	private Boolean active;

	@OneToMany(cascade = CascadeType.ALL, mappedBy="product")
	private Set<StockKeepingUnit> skus = new HashSet<StockKeepingUnit>();

	@ManyToMany(cascade = CascadeType.ALL)
	@JoinTable(name="product_locations",
    	joinColumns=@JoinColumn(name="product_id", referencedColumnName="id"),
    	inverseJoinColumns=@JoinColumn(name="location_id", referencedColumnName="id")
    )
	private Set<Location> locations = new HashSet<Location>();
}
