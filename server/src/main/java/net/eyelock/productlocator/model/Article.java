package net.eyelock.productlocator.model;

import java.util.HashSet;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
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
@Table(name="articles")
@RooPlural("Articles")
@RooJavaBean
@RooToString
@RooJpaActiveRecord(finders = { "findArticlesByCodeEquals",
		"findArticlesByListableNot", "findArticlesByNameEquals",
		"findArticlesByCodeLike" })
@RooJson
public class Article {

	@NotNull
	@Column(unique = true, name="code")
	@Size(min = 2, max = 10)
	private String code;

	@NotNull
	@Size(min = 2, max = 100)
	@Column(name="name")
	private String name;

	@Column(name="listable")
	private Boolean listable;

	@Column(name="ordered_by")
	private int orderedBy = 0;

	@OneToOne(optional=true)
	@JoinColumn(name="icon_media_id", unique=true, nullable=true, updatable=false)
	private Media icon;

	@OneToOne(optional=true)
	@JoinColumn(name="image_media_id", unique=true, nullable=true, updatable=false)
	private Media image;

	@OneToMany(cascade = CascadeType.ALL, mappedBy="article")
	private Set<ContentBlock> contentBlocks = new HashSet<ContentBlock>();
}
