/*
PRODUCTS
+----------------------+---------------+------+-----+---------+----------------+
| Field                | Type          | Null | Key | Default | Extra          |
+----------------------+---------------+------+-----+---------+----------------+
| id                   | bigint(20)    | NO   | PRI | NULL    | auto_increment |
| active               | bit(1)        | YES  |     | NULL    |                |
| available_everywhere | bit(1)        | YES  |     | NULL    |                |
| description          | varchar(1000) | YES  |     | NULL    |                |
| name                 | varchar(100)  | NO   |     | NULL    |                |
| ordered_by           | int(11)       | YES  |     | NULL    |                |
| teaser               | varchar(255)  | YES  |     | NULL    |                |
| version              | int(11)       | YES  |     | NULL    |                |
| icon_media_id        | bigint(20)    | NO   | UNI | NULL    |                |
| image_media_id       | bigint(20)    | NO   | UNI | NULL    |                |
+----------------------+---------------+------+-----+---------+----------------+

SKUS
+----------------+---------------+------+-----+---------+----------------+
| Field          | Type          | Null | Key | Default | Extra          |
+----------------+---------------+------+-----+---------+----------------+
| id             | bigint(20)    | NO   | PRI | NULL    | auto_increment |
| active         | bit(1)        | YES  |     | NULL    |                |
| description    | varchar(1000) | YES  |     | NULL    |                |
| name           | varchar(100)  | NO   |     | NULL    |                |
| price          | float         | YES  |     | NULL    |                |
| teaser         | varchar(255)  | YES  |     | NULL    |                |
| version        | int(11)       | YES  |     | NULL    |                |
| icon_media_id  | bigint(20)    | NO   | UNI | NULL    |                |
| image_media_id | bigint(20)    | NO   | UNI | NULL    |                |
| product_id     | bigint(20)    | NO   | MUL | NULL    |                |
+----------------+---------------+------+-----+---------+----------------+
*/
START TRANSACTION;


/****************** PRODUCT & SKUS ***********************/

INSERT INTO products (
	  name
	, teaser
	, description
	, active
	, available_everywhere
	, ordered_by
) VALUES (
	  'Pincer Vodka'
	, 'A cool new vodka to soothe and relax.'
	, 'Pincer combines centuries of distilling heritage, 100% selected grain and the finest Scottish mountain water with the natural botanical extracts of  Milk Thistle and Wild Elderflower.'
	, true
	, true
	, 1
);

SET @current_product_id=(SELECT id FROM products WHERE name = 'Pincer Vodka' LIMIT 1);

INSERT INTO skus (
	  product_id
	, name
	, teaser
	, description
	, price
	, active
) VALUES 
(
	  @current_product_id
	, '70cl Bottle'
	, ''
	, 'A full bottle of Pincer Vodka in presentation box.'
	, 30.99
	, true
)
,
(
	  @current_product_id
	, '35cl Bottle'
	, ''
	, 'A half bottle of Pincer Vodka in presentation box'
	, 16.99
	, true
);

/****************** PRODUCT & SKUS ***********************/


COMMIT;
