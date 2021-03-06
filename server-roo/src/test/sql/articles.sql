/*
ARTICLES
+----------------+--------------+------+-----+---------+----------------+
| Field          | Type         | Null | Key | Default | Extra          |
+----------------+--------------+------+-----+---------+----------------+
| id             | bigint(20)   | NO   | PRI | NULL    | auto_increment |
| code           | varchar(10)  | NO   | UNI | NULL    |                |
| listable       | bit(1)       | YES  |     | NULL    |                |
| name           | varchar(100) | NO   |     | NULL    |                |
| ordered_by     | int(11)      | YES  |     | NULL    |                |
| version        | int(11)      | YES  |     | NULL    |                |
| icon_media_id  | bigint(20)   | YES  | UNI | NULL    |                |
| image_media_id | bigint(20)   | YES  | UNI | NULL    |                |
+----------------+--------------+------+-----+---------+----------------+

CONTENT BLOCKS
+------------+--------------+------+-----+---------+----------------+
| Field      | Type         | Null | Key | Default | Extra          |
+------------+--------------+------+-----+---------+----------------+
| id         | bigint(20)   | NO   | PRI | NULL    | auto_increment |
| contents   | varchar(255) | YES  |     | NULL    |                |
| ordered_by | int(11)      | YES  |     | NULL    |                |
| type       | varchar(10)  | NO   |     | NULL    |                |
| version    | int(11)      | YES  |     | NULL    |                |
| article_id | bigint(20)   | NO   | MUL | NULL    |                |
+------------+--------------+------+-----+---------+----------------+
*/
START TRANSACTION;


/****************** ARTICLE & CONTENT BLOCKS ***********************/

INSERT INTO articles (
	  code
	, name
	, listable
	, ordered_by
	, version
) VALUES (
	  'home'
	, 'Pincer Vodka'
	, false
	, 0
	, 1
);


SET @current_article_id=(SELECT id FROM articles WHERE code = 'home' LIMIT 1);

INSERT INTO content_blocks (
	  article_id
	, ordered_by
	, type
	, contents
	, version
) VALUES 
(
	  @current_article_id
	, 1
	, 'TEXT'
	, 'Welcome to the wonderful world of Pincer Vodka.'
	, 1
)
,
(
	  @current_article_id
	, 2
	, 'TEXT'
	, 'Pincer combines centuries of distilling heritage, 100% selected grain and the finest Scottish mountain water with the natural botanical extracts of  Milk Thistle and Wild Elderflower.'
	, 1
)
,
(
	  @current_article_id
	, 3
	, 'TEXT'
	, 'The spirit is distilled to 38% - the ''perfect'' volume for vodka, as discovered by Dmitri Mendeleev the creator of the periodic table.'
	, 1
)
,
(
	  @current_article_id
	, 4
	, 'TEXT'
	, 'Pincer Vodka is made to perfection - in quality, taste and style, using no artificial ingredients.'
	, 1
)
;


/****************** ARTICLE & CONTENT BLOCKS ***********************/


COMMIT;