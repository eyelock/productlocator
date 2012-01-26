package net.eyelock.productlocator.model;

import javax.persistence.Column;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
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
@Table(name = "content_blocks")
@RooPlural("ContentBlocks")
@RooJavaBean
@RooToString
@RooJson
@RooJpaActiveRecord(finders = { "findContentBlocksByArticle",
		"findContentBlocksByTypeEquals", "findContentBlocksByDescriptionLike" })
public class ContentBlock {
	@ManyToOne
	@JoinColumn(name = "article_id", nullable = false)
	private Article article;

	@NotNull
	@Size(min = 2, max = 10)
	@Column(name = "type")
	@Enumerated(EnumType.STRING)
	private ContentBlockType type;

	@Column(name = "ordered_by")
	private int orderedBy = 0;

	@Column(name = "contents")
	private String contents;
	
	@Transient
	private boolean lazy = false;
	
	public ContentBlock toLazyBean() {
		ContentBlock lazyItem = new ContentBlock();
		lazyItem.setLazy(true);
		lazyItem.setId(this.getId());		
		return lazyItem;
	}
}
