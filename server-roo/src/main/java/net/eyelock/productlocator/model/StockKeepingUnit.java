package net.eyelock.productlocator.model;

import javax.persistence.Column;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
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
@Table(name="skus")
@RooPlural("StockKeepingUnits")
@RooJavaBean
@RooToString
@RooJpaActiveRecord(finders = { "findStockKeepingUnitsByProduct",
		"findStockKeepingUnitsByActiveNot", "findStockKeepingUnitsByNameLike",
		"findStockKeepingUnitsByNameEquals",
		"findStockKeepingUnitsByPriceBetween" })
public class StockKeepingUnit {

	@ManyToOne
	@JoinColumn(name="product_id", nullable=false)
	private Product product;

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

	@ManyToOne
	@JoinColumn(name="icon_media_id", unique=false, nullable=true, updatable=true)
	private Media icon;

	@ManyToOne
	@JoinColumn(name="image_media_id", unique=false, nullable=true, updatable=true)
	private Media image;

	@Column(name="active")
	private Boolean active;

	@Column(name="price")
	private Float price;
}
